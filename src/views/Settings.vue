<template>
  <div>
    <div class="page-header">
      <h2>Settings</h2>
      <p style="color: #909399; margin: 0;">Configure your workspace preferences</p>
    </div>

    <el-card shadow="hover" style="max-width: 720px;">
      <el-form ref="settingsForm" :model="form" label-width="160px">
        <h4 style="margin-top: 0;">Company Information</h4>
        <el-form-item label="Company Name">
          <el-input v-model="form.companyName" />
        </el-form-item>
        <el-form-item label="Address">
          <el-input v-model="form.address" type="textarea" :rows="3" />
        </el-form-item>
        <el-form-item label="Phone">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="Billing Email">
          <el-input v-model="form.email" />
        </el-form-item>

        <h4>Notifications</h4>
        <el-form-item label="Email Notifications">
          <el-switch v-model="form.emailNotifications" active-text="Enabled" inactive-text="Disabled" />
        </el-form-item>
        <el-form-item label="Weekly Report">
          <el-switch v-model="form.weeklyReport" active-text="Enabled" inactive-text="Disabled" />
        </el-form-item>
        <el-form-item label="Shipment Alerts">
          <el-switch v-model="form.shipmentAlerts" active-text="Enabled" inactive-text="Disabled" />
        </el-form-item>
      </el-form>

      <div style="text-align: right; margin-top: 20px;">
        <el-button @click="resetForm">Reset</el-button>
        <el-button type="primary" @click="saveSettings">Save Settings</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  data() {
    return {
      form: {
        companyName: 'LedgerFlow Logistics Inc.',
        address: '1200 Harbor Blvd, Suite 500\nFictional Bay, CA 94000',
        phone: '+1-555-0199',
        email: 'billing@ledgerflow.example.com',
        emailNotifications: true,
        weeklyReport: true,
        shipmentAlerts: false
      }
    }
  },
  methods: {
    resetForm() {
      this.form = {
        companyName: 'LedgerFlow Logistics Inc.',
        address: '1200 Harbor Blvd, Suite 500\nFictional Bay, CA 94000',
        phone: '+1-555-0199',
        email: 'billing@ledgerflow.example.com',
        emailNotifications: true,
        weeklyReport: true,
        shipmentAlerts: false
      }
      this.$message.info('Settings reset to default')
    },
    saveSettings() {
      this.$message.success('Settings saved (in-memory only)')
    }
  }
}
</script>
