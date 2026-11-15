<template>
  <div>
    <div class="page-header">
      <h2>Orders</h2>
      <p style="color: #909399; margin: 0;">Manage and review all logistics orders</p>
    </div>

    <el-card shadow="hover">
      <div class="table-toolbar">
        <div class="filter-group">
          <el-input
            v-model="searchQuery"
            placeholder="Search order ID, customer or company"
            prefix-icon="el-icon-search"
            clearable
            style="width: 280px;"
          />
          <el-select v-model="statusFilter" placeholder="Status" clearable style="width: 140px;">
            <el-option label="All" value="" />
            <el-option label="Pending" value="pending" />
            <el-option label="Shipped" value="shipped" />
            <el-option label="Delivered" value="delivered" />
            <el-option label="Cancelled" value="cancelled" />
          </el-select>
          <el-select v-model="sortOrder" placeholder="Sort by amount" style="width: 160px;">
            <el-option label="Default" value="" />
            <el-option label="Amount: Low to High" value="asc" />
            <el-option label="Amount: High to Low" value="desc" />
          </el-select>
        </div>
        <el-button type="primary" icon="el-icon-download" @click="exportCsv">
          Export CSV
        </el-button>
      </div>

      <el-table :data="pagedOrders" border stripe style="width: 100%;">
        <el-table-column prop="id" label="Order ID" width="140" />
        <el-table-column prop="customerName" label="Customer" width="140" />
        <el-table-column prop="company" label="Company" />
        <el-table-column prop="destination" label="Destination" width="130" />
        <el-table-column prop="amount" label="Amount" width="120" sortable>
          <template slot-scope="{ row }">
            {{ formatCurrency(row.amount) }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="Status" width="110">
          <template slot-scope="{ row }">
            <el-tag :type="statusType(row.status)" size="mini">
              {{ statusLabel(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="orderDate" label="Order Date" width="120" sortable />
        <el-table-column label="Actions" width="100" fixed="right">
          <template slot-scope="{ row }">
            <el-button type="text" size="small" @click="openDetail(row)">View</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin-top: 16px; text-align: right;">
        <el-pagination
          :current-page.sync="page"
          :page-size="pageSize"
          :page-sizes="[10, 20, 50]"
          :total="filteredOrders.length"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        />
      </div>
    </el-card>

    <el-drawer
      :visible.sync="drawerVisible"
      :title="selectedOrder ? selectedOrder.id : 'Order Detail'"
      size="480px"
    >
      <div v-if="selectedOrder" style="padding: 0 20px;">
        <el-descriptions :column="1" border>
          <el-descriptions-item label="Customer">{{ selectedOrder.customerName }}</el-descriptions-item>
          <el-descriptions-item label="Company">{{ selectedOrder.company }}</el-descriptions-item>
          <el-descriptions-item label="Email">{{ selectedOrder.email }}</el-descriptions-item>
          <el-descriptions-item label="Destination">{{ selectedOrder.destination }}</el-descriptions-item>
          <el-descriptions-item label="Order Date">{{ selectedOrder.orderDate }}</el-descriptions-item>
          <el-descriptions-item label="Amount">{{ formatCurrency(selectedOrder.amount) }}</el-descriptions-item>
          <el-descriptions-item label="Status">
            <el-tag :type="statusType(selectedOrder.status)" size="mini">
              {{ statusLabel(selectedOrder.status) }}
            </el-tag>
          </el-descriptions-item>
        </el-descriptions>

        <h4 style="margin: 20px 0 12px 0;">Items</h4>
        <el-table :data="selectedOrder.items" border size="small">
          <el-table-column prop="product" label="Product" />
          <el-table-column prop="qty" label="Qty" width="80" />
          <el-table-column prop="unitPrice" label="Unit Price" width="110">
            <template slot-scope="{ row }">
              {{ formatCurrency(row.unitPrice) }}
            </template>
          </el-table-column>
        </el-table>

        <div v-if="selectedOrder.notes" style="margin-top: 16px; color: #909399; font-size: 13px;">
          Note: {{ selectedOrder.notes }}
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { formatCurrency, statusLabel, statusType } from '@/utils/formatter'

export default {
  name: 'Orders',
  data() {
    return {
      searchQuery: '',
      statusFilter: '',
      sortOrder: '',
      page: 1,
      pageSize: 10,
      drawerVisible: false,
      selectedOrder: null
    }
  },
  computed: {
    ...mapState(['orders']),
    filteredOrders() {
      let result = this.orders.filter(order => {
        const matchesStatus = this.statusFilter ? order.status === this.statusFilter : true
        const query = this.searchQuery.trim().toLowerCase()
        const matchesSearch = query
          ? order.id.toLowerCase().includes(query) ||
            order.customerName.toLowerCase().includes(query) ||
            order.company.toLowerCase().includes(query)
          : true
        return matchesStatus && matchesSearch
      })

      if (this.sortOrder === 'asc') {
        result = result.slice().sort((a, b) => a.amount - b.amount)
      } else if (this.sortOrder === 'desc') {
        result = result.slice().sort((a, b) => b.amount - a.amount)
      }

      return result
    },
    pagedOrders() {
      const start = (this.page - 1) * this.pageSize
      return this.filteredOrders.slice(start, start + this.pageSize)
    }
  },
  watch: {
    searchQuery() {
      this.page = 1
    },
    statusFilter() {
      this.page = 1
    },
    sortOrder() {
      this.page = 1
    }
  },
  methods: {
    formatCurrency,
    statusLabel,
    statusType,
    handleSizeChange(size) {
      this.pageSize = size
      this.page = 1
    },
    handlePageChange(page) {
      this.page = page
    },
    openDetail(order) {
      this.selectedOrder = order
      this.drawerVisible = true
    },
    exportCsv() {
      const headers = ['Order ID', 'Customer', 'Company', 'Destination', 'Amount', 'Status', 'Order Date']
      const rows = this.filteredOrders.map(order => [
        order.id,
        order.customerName,
        order.company,
        order.destination,
        order.amount,
        statusLabel(order.status),
        order.orderDate
      ])
      const escapeCsv = (value) => {
        const str = String(value)
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
          return '"' + str.replace(/"/g, '""') + '"'
        }
        return str
      }
      const lines = [headers, ...rows].map(line => line.map(escapeCsv).join(','))
      const csvContent = '\uFEFF' + lines.join('\n')
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `ledgerflow-orders-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(link.href)
    }
  }
}
</script>
