<template>
  <div class="grid p-fluid">
    <div class="col-12 md:col-6">
      <div class="card">
        <h5>Input Text</h5>
        <div class="grid formgrid">
          <div class="col-12 mb-2 lg:col-4 lg:mb-0">
            <InputText type="text" placeholder="Default"></InputText>
          </div>
          <div class="col-12 mb-2 lg:col-4 lg:mb-0">
            <InputText type="text" placeholder="Disabled" :disabled="true"></InputText>
          </div>
          <div class="col-12 mb-2 lg:col-4 lg:mb-0">
            <InputText type="text" placeholder="Invalid" :invalid="true"></InputText>
          </div>
        </div>

        <h5>Icons</h5>
        <div class="grid formgrid">
          <div class="col-12 mb-2 lg:col-4 lg:mb-0">
            <IconField iconPosition="left">
                <InputIcon class="pi pi-user" />
                <InputText type="text" placeholder="Username" />
            </IconField>
          </div>
          <div class="col-12 mb-2 lg:col-4 lg:mb-0">
            <IconField iconPosition="right">
                <InputIcon class="pi pi-search" />
                <InputText type="text" placeholder="Search" />
            </IconField>
          </div>
          <div class="col-12 mb-2 lg:col-4 lg:mb-0">
            <IconField iconPosition="left">
                <InputIcon class="pi pi-envelope" />
                <InputText type="text" placeholder="Email" />
            </IconField>
          </div>
        </div>
      </div>

      <div class="card">
        <h5>Buttons</h5>
        <div class="flex flex-wrap gap-2">
            <Button label="Submit" />
            <Button label="Disabled" :disabled="true" />
            <Button label="Link" class="p-button-link" />
        </div>
        
        <h5 class="mt-4">Severities</h5>
        <div class="flex flex-wrap gap-2">
            <Button label="Primary" />
            <Button label="Secondary" severity="secondary" />
            <Button label="Success" severity="success" />
            <Button label="Info" severity="info" />
            <Button label="Warning" severity="warning" />
            <Button label="Help" severity="help" />
            <Button label="Danger" severity="danger" />
        </div>
      </div>
      
      <div class="card">
        <h5>Messages</h5>
        <Message severity="info" :closable="false">Info Message</Message>
        <Message severity="success" :closable="false">Success Message</Message>
        <Message severity="warn" :closable="false">Warning Message</Message>
        <Message severity="error" :closable="false">Error Message</Message>
      </div>
    </div>

    <div class="col-12 md:col-6">
      <div class="card">
          <h5>Checkbox</h5>
          <div class="grid formgrid">
              <div class="col-12 md:col-4">
                  <div class="flex items-center">
                      <Checkbox inputId="cboption1" name="option" value="Chicago" v-model="checkboxValue" />
                      <label for="cboption1" class="ml-2">Chicago</label>
                  </div>
              </div>
              <div class="col-12 md:col-4">
                  <div class="flex items-center">
                      <Checkbox inputId="cboption2" name="option" value="Los Angeles" v-model="checkboxValue" />
                      <label for="cboption2" class="ml-2">Los Angeles</label>
                  </div>
              </div>
              <div class="col-12 md:col-4">
                  <div class="flex items-center">
                      <Checkbox inputId="cboption3" name="option" value="New York" v-model="checkboxValue" />
                      <label for="cboption3" class="ml-2">New York</label>
                  </div>
              </div>
          </div>
      </div>

      <div class="card">
          <h5>RadioButton</h5>
          <div class="grid formgrid">
              <div class="col-12 md:col-4">
                  <div class="flex items-center">
                      <RadioButton inputId="rboption1" name="option" value="Chicago" v-model="radioValue" />
                      <label for="rboption1" class="ml-2">Chicago</label>
                  </div>
              </div>
              <div class="col-12 md:col-4">
                  <div class="flex items-center">
                      <RadioButton inputId="rboption2" name="option" value="Los Angeles" v-model="radioValue" />
                      <label for="rboption2" class="ml-2">Los Angeles</label>
                  </div>
              </div>
              <div class="col-12 md:col-4">
                  <div class="flex items-center">
                      <RadioButton inputId="rboption3" name="option" value="New York" v-model="radioValue" />
                      <label for="rboption3" class="ml-2">New York</label>
                  </div>
              </div>
          </div>
      </div>
      
      <div class="card">
          <h5>ToggleSwitch</h5>
          <div class="flex flex-wrap gap-2">
              <ToggleSwitch v-model="switchValue" />
              <ToggleSwitch v-model="switchValue2" />
          </div>
      </div>
      
      <div class="card">
          <h5>Slider</h5>
          <div class="mb-4">
            <InputNumber v-model="sliderValue" />
          </div>
          <Slider v-model="sliderValue" class="mt-4" />
      </div>
      
      <div class="card flex flex-col gap-4">
          <h5>Panel</h5>
          <Panel header="Header" :toggleable="true">
              <p class="m-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
          </Panel>
      </div>
    </div>

    <div class="col-12">
        <div class="card">
            <h5>DataTable</h5>
            <DataTable :value="customers" :paginator="true" :rows="5" responsiveLayout="scroll">
                <Column field="name" header="Name" :sortable="true" style="width: 35%"></Column>
                <Column field="country.name" header="Country" :sortable="true" style="width: 35%"></Column>
                <Column field="company" header="Company" :sortable="true" style="width: 30%"></Column>
            </DataTable>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const checkboxValue = ref<string[]>([]);
const radioValue = ref<string | null>(null);
const switchValue = ref(false);
const switchValue2 = ref(true);
const sliderValue = ref(50);
const customers = ref<any[]>([]);

onMounted(() => {
    customers.value = [
        {name: "James Butt", country: {name: "Algeria"}, company: "Benton, John B Jr"},
        {name: "Josephine Darakjy", country: {name: "Egypt"}, company: "Chanay, Jeffrey A Esq"},
        {name: "Art Venere", country: {name: "Panama"}, company: "Chemel, James L Cpa"},
        {name: "Lenna Paprocki", country: {name: "Slovenia"}, company: "Feltz Printing Service"},
        {name: "Donette Foller", country: {name: "South Africa"}, company: "Printing Dimensions"},
        {name: "Simona Morasca", country: {name: "Egypt"}, company: "Chapman, Ross E Esq"},
        {name: "Mitsue Tollner", country: {name: "Paraguay"}, company: "Morlong Associates"},
        {name: "Leota Dilliard", country: {name: "Serbia"}, company: "Commercial Press"},
        {name: "Sage Wieser", country: {name: "Egypt"}, company: "Truhlar And Truhlar Attys"},
        {name: "Kris Marrier", country: {name: "Mexico"}, company: "King, Christopher A Esq"}
    ];
});
</script>
