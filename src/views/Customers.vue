<template>
  <div>
    <div class="page-header">
      <h2>Customers</h2>
      <p style="color: #909399; margin: 0;">Manage your B2B customer directory</p>
    </div>

    <el-card shadow="hover">
      <div class="table-toolbar">
        <el-input
          v-model="searchQuery"
          placeholder="Search name, company or email"
          prefix-icon="el-icon-search"
          clearable
          style="width: 280px;"
        />
        <el-button type="primary" icon="el-icon-plus" @click="openCreate">New Customer</el-button>
      </div>

      <el-table :data="pagedCustomers" border stripe style="width: 100%;">
        <el-table-column prop="id" label="ID" width="70" />
        <el-table-column prop="name" label="Contact Name" width="150" />
        <el-table-column prop="company" label="Company" />
        <el-table-column prop="email" label="Email" />
        <el-table-column prop="phone" label="Phone" width="150" />
        <el-table-column prop="country" label="Country" width="120" />
        <el-table-column label="Actions" width="150" fixed="right">
          <template slot-scope="{ row }">
            <el-button type="text" size="small" @click="openEdit(row)">Edit</el-button>
            <el-popconfirm
              title="Are you sure to delete this customer?"
              confirm-button-text="Delete"
              cancel-button-text="Cancel"
              @confirm="handleDelete(row.id)"
            >
              <el-button slot="reference" type="text" size="small" style="color: #f56c6c;">Delete</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin-top: 16px; text-align: right;">
        <el-pagination
          :current-page.sync="page"
          :page-size="pageSize"
          :total="filteredCustomers.length"
          layout="total, prev, pager, next"
          @current-change="handlePageChange"
        />
      </div>
    </el-card>

    <el-dialog
      :title="isEdit ? 'Edit Customer' : 'New Customer'"
      :visible.sync="dialogVisible"
      width="520px"
      :close-on-click-modal="false"
      @closed="resetForm"
    >
      <el-form ref="customerForm" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="Contact Name" prop="name">
          <el-input v-model="form.name" placeholder="Contact name" />
        </el-form-item>
        <el-form-item label="Company" prop="company">
          <el-input v-model="form.company" placeholder="Company name" />
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email" placeholder="email@example.com" />
        </el-form-item>
        <el-form-item label="Phone" prop="phone">
          <el-input v-model="form.phone" placeholder="Phone number" />
        </el-form-item>
        <el-form-item label="Country" prop="country">
          <el-input v-model="form.country" placeholder="Country" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitForm">Save</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Customers',
  data() {
    return {
      searchQuery: '',
      page: 1,
      pageSize: 10,
      dialogVisible: false,
      isEdit: false,
      form: {
        id: null,
        name: '',
        company: '',
        email: '',
        phone: '',
        country: ''
      },
      rules: {
        name: [{ required: true, message: 'Please enter contact name', trigger: 'blur' }],
        company: [{ required: true, message: 'Please enter company name', trigger: 'blur' }],
        email: [
          { required: true, message: 'Please enter email', trigger: 'blur' },
          { type: 'email', message: 'Please enter a valid email address', trigger: 'blur' }
        ],
        phone: [{ required: true, message: 'Please enter phone', trigger: 'blur' }],
        country: [{ required: true, message: 'Please enter country', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapState(['customers']),
    filteredCustomers() {
      const query = this.searchQuery.trim().toLowerCase()
      if (!query) return this.customers
      return this.customers.filter(c =>
        c.name.toLowerCase().includes(query) ||
        c.company.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query)
      )
    },
    pagedCustomers() {
      const start = (this.page - 1) * this.pageSize
      return this.filteredCustomers.slice(start, start + this.pageSize)
    }
  },
  watch: {
    searchQuery() {
      this.page = 1
    }
  },
  methods: {
    handlePageChange(page) {
      this.page = page
    },
    openCreate() {
      this.isEdit = false
      this.resetForm()
      this.dialogVisible = true
    },
    openEdit(row) {
      this.isEdit = true
      this.form = { ...row }
      this.dialogVisible = true
    },
    resetForm() {
      this.form = {
        id: null,
        name: '',
        company: '',
        email: '',
        phone: '',
        country: ''
      }
      this.$nextTick(() => {
        if (this.$refs.customerForm) {
          this.$refs.customerForm.clearValidate()
        }
      })
    },
    submitForm() {
      this.$refs.customerForm.validate(valid => {
        if (!valid) return
        if (this.isEdit) {
          this.$store.dispatch('updateCustomer', { ...this.form })
          this.$message.success('Customer updated successfully')
        } else {
          const newId = Math.max(...this.customers.map(c => c.id), 0) + 1
          this.$store.dispatch('addCustomer', { ...this.form, id: newId })
          this.$message.success('Customer created successfully')
        }
        this.dialogVisible = false
      })
    },
    handleDelete(id) {
      this.$store.dispatch('removeCustomer', id)
      this.$message.success('Customer deleted successfully')
      if (this.pagedCustomers.length === 0 && this.page > 1) {
        this.page -= 1
      }
    }
  }
}
</script>
