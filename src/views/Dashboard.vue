<template>
  <div>
    <div class="page-header">
      <h2>Dashboard</h2>
      <p style="color: #909399; margin: 0;">Overview of your logistics operations</p>
    </div>

    <div class="card-grid">
      <el-card class="kpi-card" shadow="hover">
        <div class="kpi-label">Monthly Orders</div>
        <div class="kpi-value">{{ kpis.monthlyOrders }}</div>
      </el-card>
      <el-card class="kpi-card" shadow="hover">
        <div class="kpi-label">Pending Shipment</div>
        <div class="kpi-value" style="color: #e6a23c;">{{ kpis.pendingShipment }}</div>
      </el-card>
      <el-card class="kpi-card" shadow="hover">
        <div class="kpi-label">Total Customers</div>
        <div class="kpi-value" style="color: #409eff;">{{ kpis.totalCustomers }}</div>
      </el-card>
      <el-card class="kpi-card" shadow="hover">
        <div class="kpi-label">Monthly Revenue</div>
        <div class="kpi-value" style="color: #67c23a;">{{ formatCurrency(kpis.monthlyRevenue) }}</div>
      </el-card>
    </div>

    <div class="chart-row">
      <el-card class="chart-card" shadow="hover">
        <div slot="header">Orders in Last 12 Months</div>
        <div ref="ordersChart" style="width: 100%; height: 320px;" />
      </el-card>
      <el-card class="chart-card" shadow="hover">
        <div slot="header">Order Status Distribution</div>
        <div ref="statusChart" style="width: 100%; height: 320px;" />
      </el-card>
    </div>

    <el-card shadow="hover">
      <div slot="header">Recent Orders</div>
      <el-table :data="recentOrders" size="small" border>
        <el-table-column prop="id" label="Order ID" width="130" />
        <el-table-column prop="company" label="Customer" />
        <el-table-column prop="amount" label="Amount" width="120">
          <template #default="{ row }">
            {{ formatCurrency(row.amount) }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="Status" width="110">
          <template #default="{ row }">
            <el-tag :type="statusType(row.status)" size="mini">{{ statusLabel(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="orderDate" label="Date" width="120" />
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as echarts from 'echarts'
import { formatCurrency, statusLabel, statusType } from '@/utils/formatter'

export default {
  name: 'Dashboard',
  data() {
    return {
      ordersChart: null,
      statusChart: null
    }
  },
  computed: {
    ...mapState(['kpis', 'orders']),
    recentOrders() {
      return this.orders.slice(0, 5)
    }
  },
  mounted() {
    this.initCharts()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
    if (this.ordersChart) this.ordersChart.dispose()
    if (this.statusChart) this.statusChart.dispose()
  },
  methods: {
    formatCurrency,
    statusLabel,
    statusType,
    handleResize() {
      if (this.ordersChart) this.ordersChart.resize()
      if (this.statusChart) this.statusChart.resize()
    },
    initCharts() {
      this.renderOrdersChart()
      this.renderStatusChart()
    },
    renderOrdersChart() {
      const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ]
      const data = [18, 22, 19, 24, 28, 32, 30, 27, 35, 31, 29, 34]
      this.ordersChart = echarts.init(this.$refs.ordersChart)
      this.ordersChart.setOption({
        tooltip: { trigger: 'axis' },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: {
          type: 'category',
          data: months,
          axisLine: { lineStyle: { color: '#909399' } }
        },
        yAxis: {
          type: 'value',
          axisLine: { lineStyle: { color: '#909399' } },
          splitLine: { lineStyle: { color: '#ebeef5' } }
        },
        series: [{
          data,
          type: 'bar',
          itemStyle: { color: '#409EFF' },
          barWidth: '50%'
        }]
      })
    },
    renderStatusChart() {
      const counts = this.orders.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1
        return acc
      }, {})
      const data = [
        { value: counts.pending || 0, name: 'Pending' },
        { value: counts.shipped || 0, name: 'Shipped' },
        { value: counts.delivered || 0, name: 'Delivered' },
        { value: counts.cancelled || 0, name: 'Cancelled' }
      ]
      this.statusChart = echarts.init(this.$refs.statusChart)
      this.statusChart.setOption({
        tooltip: { trigger: 'item' },
        legend: { bottom: '0%' },
        color: ['#e6a23c', '#409eff', '#67c23a', '#f56c6c'],
        series: [{
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 6,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: { show: false },
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: 'bold'
            }
          },
          data
        }]
      })
    }
  }
}
</script>
