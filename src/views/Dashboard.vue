<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100">Analytics</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Real-time performance data</p>
      </div>
      <button class="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-xl shadow-lg hover:bg-blue-700 hover:-translate-y-1 transition duration-200">
        <i class="pi pi-plus-circle text-xl" />
        <span class="font-bold">Generate Report</span>
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class="bg-white dark:bg-surface-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-surface-800 flex items-center justify-between group hover:shadow-xl transition-shadow duration-300">
        <div>
          <p class="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Total Users</p>
          <h3 class="text-4xl font-black text-gray-800 dark:text-white mt-1">1,234</h3>
        </div>
        <div class="p-4 bg-blue-50 dark:bg-blue-900/20 text-primary dark:text-blue-400 rounded-2xl transition-transform group-hover:scale-110">
          <i class="pi pi-users text-4xl" />
        </div>
      </div>

      <div class="bg-white dark:bg-surface-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-surface-800 flex items-center justify-between group hover:shadow-xl transition-shadow duration-300">
          <div>
            <p class="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Active Sessions</p>
            <h3 class="text-4xl font-black text-gray-800 dark:text-white mt-1">45</h3>
          </div>
          <div class="p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-2xl transition-transform group-hover:scale-110">
            <i class="pi pi-chart-line text-4xl" />
          </div>
        </div>

        <div class="bg-white dark:bg-surface-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-surface-800 flex items-center justify-between group hover:shadow-xl transition-shadow duration-300">
          <div>
            <p class="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Storage Used</p>
            <h3 class="text-4xl font-black text-gray-800 dark:text-white mt-1">2.4GB</h3>
          </div>
          <div class="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl transition-transform group-hover:scale-110">
            <i class="pi pi-database text-4xl" />
          </div>
        </div>
    </div>

    <div class="bg-white dark:bg-surface-900 rounded-2xl shadow-sm border border-gray-100 dark:border-surface-800 overflow-hidden">
      <div class="p-8 border-b border-gray-100 dark:border-surface-800">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">Recent Activity</h2>
      </div>
      <div class="p-20 text-center">
          <div class="inline-block p-4 bg-gray-50 dark:bg-surface-800 rounded-full mb-4">
            <i class="pi pi-history text-3xl text-gray-400 dark:text-gray-500" />
          </div>
          <p class="text-gray-500 dark:text-gray-400 font-medium">No recent activity found for your account.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
