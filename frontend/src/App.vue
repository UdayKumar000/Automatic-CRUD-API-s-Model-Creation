<script setup>
import { ref, onMounted, watch } from "vue"
import {
    VDataTable,
    VDialog,
    VCard,
    VCardTitle,
    VCardText,
    VTextField,
    VCardActions,
    VBtn,
    VForm,
} from "vuetify/components"

const newRecordDialog = ref(false)
const modelObjectArray = ref([])
const modelFields = ref([])
const newRecord = ref({})
const headers = ref([])
const data = ref([])
const models = ref([])
const apiUrl = ref("")
const selectedModel = ref("")
const dialog = ref(false)
const editedRecord = ref({})
const form = ref(null)
const role = ref("user")
const token = ref("")

watch(selectedModel, () => {
    if (selectedModel.value) {
        modelFields.value = modelObjectArray.value.find(
            (model) => model.name === selectedModel.value
        )?.fields || []

        // Create blank new record for the selected model
        newRecord.value = Object.fromEntries(modelFields.value.filter(f => f.name !== 'id').map(f => [f.name, ""]))
        // newRecord.value = newRecord.value.filter((_, key) => key !== 'id')

        console.log("newRecord obj", newRecord.value)
        newRecordDialog.value = false // keep closed initially
        apiUrl.value = `http://localhost:3000/api/${selectedModel.value}`
        fetchData()
    }
})

apiUrl.value = `http://localhost:3000/api/${selectedModel.value}`

function editUser(item) {
    console.log("Editing item:", item)
    editedRecord.value = { ...item }
    dialog.value = true
}

const fetchModels = async () => {
    try {
        const res = await (await fetch("http://localhost:3000/showModels")).json()
        const modelNameArray = res.models.map((model) => model.name)
        res.models.forEach((model) => {
            modelObjectArray.value.push({ name: model.name, fields: model.fields })
        })
        models.value = modelNameArray
    } catch (err) {
        console.error("Failed to fetch models:", err)
    }
}

async function deleteItem(item) {
    const deleteEndpoint = `http://localhost:3000/api/${selectedModel.value}/${item.id}`
    try {
        const response = await fetch(deleteEndpoint, {
            headers: {
                "Authorization": `Bearer ${token.value}`
            },
            method: "DELETE"
        })
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        data.value = data.value.filter((i) => i.id !== item.id)
    } catch (error) {
        console.error("Error deleting record:", error)
    }
}

async function saveUser() {
    const updatedRecord = { ...editedRecord.value }
    console.log("body", JSON.stringify(updatedRecord))
    console.log("updatedRecord", updatedRecord)
    console.log("modelFields", modelFields.value)

    const updateEndpoint = `http://localhost:3000/api/${selectedModel.value}/${updatedRecord.id}`
    try {
        const response = await fetch(updateEndpoint, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.value}`
            },
            body: JSON.stringify(updatedRecord),
        })

        if (!response.ok) {
            const result = await response.json()
            console.log(result)
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const index = data.value.findIndex((item) => item.id === updatedRecord.id)
        if (index !== -1) data.value[index] = updatedRecord
    } catch (error) {
        console.log("Error updating record:", error)
    }

    dialog.value = false
}

const fetchData = async () => {
    try {
        const res = await fetch(apiUrl.value)
        data.value = await res.json()

        if (data.value.length > 0) {
            headers.value = Object.keys(data.value[0]).map((key) => ({
                title: key,
                key,
            }))
            headers.value.push({ title: "Actions", key: "actions" })
            headers.value = headers.value.filter((header) => header.key !== 'id')
        }
    } catch (err) {
        console.error("Failed to fetch:", err)
    }
}

function getLocalStorage() {
    const storedRole = localStorage.getItem("role")
    const storedToken = localStorage.getItem("token")
    if (storedRole) {
        role.value = storedRole
    }
    if (storedToken) {
        token.value = storedToken
    }
}

onMounted(fetchData)
onMounted(fetchModels)
onMounted(getLocalStorage)
</script>

<template>
    <div class="main-container">
        <header class="header-bar">
            <div class="title-section">
                <h2 class="page-title">📊 Dynamic Model Editor</h2>
                <p class="subtitle">Manage and edit models generated dynamically</p>
            </div>

            <div class="select-actions">
                <div class="select-box">
                    <label for="model-select">Available Model</label>
                    <select id="model-select" v-model="selectedModel" class="model-select">
                        <option value="" disabled>Select Model</option>
                        <option v-for="model in models" :key="model" :value="model">
                            {{ model }}
                        </option>
                    </select>
                </div>

                <a class="create-btn" href="/create-model">
                    + Create Model
                </a>

                <!-- 🆕 Add New Record Button -->
                <VBtn color="indigo" variant="flat" class="add-record-btn" @click="newRecordDialog = true"
                    :disabled="!selectedModel">
                    + Add New Record
                </VBtn>
            </div>
        </header>

        <v-data-table class="data-table" v-if="data && data.length > 0" :items="data" :headers="headers"
            :items-per-page="10" show-current-page>
            <template #item.actions="{ item }">
                <div class="action-buttons" v-if="role === 'admin'">
                    <VBtn @click="editUser(item)" small color="indigo" variant="flat" class="btn-edit">
                        Edit
                    </VBtn>
                    <VBtn @click="deleteItem(item)" small color="error" variant="flat" class="btn-delete">
                        Delete
                    </VBtn>
                </div>
                <div v-else>
                    <em>View Only</em>
                </div>
            </template>
        </v-data-table>

        <!-- no data available message -->

        <div v-else class="no-data">
            <em>No data available</em>
        </div>

        <!-- Edit Dialog -->
        <VDialog v-model="dialog" width="500">
            <VForm ref="form">
                <VCard class="dialog-card">
                    <VCardTitle class="dialog-title">Edit Record</VCardTitle>
                    <VCardText>
                        <VTextField v-for="(value, key) in editedRecord" :key="key" v-model="editedRecord[key]"
                            :label="key.charAt(0).toUpperCase() + key.slice(1)" class="text-field" variant="outlined"
                            color="indigo" />
                    </VCardText>
                    <VCardActions class="dialog-actions">
                        <VBtn text color="grey" @click="dialog = false">Cancel</VBtn>
                        <VBtn color="indigo" @click="saveUser">Save</VBtn>
                    </VCardActions>
                </VCard>
            </VForm>
        </VDialog>

        <!-- New Record Dialog -->
        <VDialog v-model="newRecordDialog" width="500">
            <VForm ref="form">
                <VCard class="dialog-card">
                    <VCardTitle class="dialog-title">Add New Record</VCardTitle>
                    <VCardText>
                        <VTextField v-for="(value, key) in newRecord" :key="key" v-model="newRecord[key]"
                            :label="key.charAt(0).toUpperCase() + key.slice(1)" class="text-field" variant="outlined"
                            color="indigo" />
                    </VCardText>
                    <VCardActions class="dialog-actions">
                        <VBtn text color="grey" @click="newRecordDialog = false">Cancel</VBtn>
                        <VBtn color="indigo" @click="saveUser">Save</VBtn>
                    </VCardActions>
                </VCard>
            </VForm>
        </VDialog>
    </div>
</template>

<style scoped>
.main-container {
    max-width: 1200px;
    margin: 40px auto;
    padding: 30px;
    background: linear-gradient(145deg, #ffffff, #f7f8ff);
    border-radius: 16px;
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease-in-out;
}

.header-bar {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 30px;
    border-bottom: 2px solid #eef0f7;
    padding-bottom: 15px;
}

.title-section {
    display: flex;
    flex-direction: column;
}

.page-title {
    font-size: 1.8rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 4px;
}

.subtitle {
    color: #6c757d;
    font-size: 0.95rem;
}

.select-actions {
    display: flex;
    align-items: flex-end;
    gap: 15px;
}

.select-box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.select-box label {
    font-size: 0.85rem;
    color: #555;
    margin-bottom: 6px;
}

.model-select {
    padding: 10px 14px;
    border-radius: 10px;
    border: 1.5px solid #ccc;
    background: white;
    font-size: 15px;
    transition: all 0.2s ease;
}

.model-select:hover,
.model-select:focus {
    border-color: #5a67d8;
    box-shadow: 0 0 0 3px rgba(90, 103, 216, 0.2);
}

/* Create Model Button */
.create-btn {
    font-weight: 600;
    border-radius: 10px;
    padding: 10px 18px;
    text-transform: none;
    transition: all 0.25s ease;
    box-shadow: 0 3px 10px rgba(90, 103, 216, 0.2);
    width: 100%;
}

.create-btn:hover {
    color: white;
    background-color: #4c51bf !important;
    box-shadow: 0 4px 14px rgba(90, 103, 216, 0.3);
    transform: translateY(-1px);
}

/* 🆕 Add Record Button */
.add-record-btn {
    font-weight: 600;
    border-radius: 10px;
    padding: 10px 18px;
    text-transform: none;
    transition: all 0.25s ease;
    box-shadow: 0 3px 10px rgba(90, 103, 216, 0.2);
}

.add-record-btn:hover {
    background-color: #4c51bf !important;
    color: white;
    box-shadow: 0 4px 14px rgba(90, 103, 216, 0.3);
    transform: translateY(-1px);
}

.data-table {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    transition: all 0.3s ease;
}

.action-buttons {
    display: flex;
    gap: 10px;
    justify-content: center;
}

.btn-edit,
.btn-delete {
    text-transform: none;
    font-weight: 500;
    border-radius: 8px;
    transition: transform 0.2s ease;
}

.btn-edit:hover,
.btn-delete:hover {
    transform: scale(1.05);
}

.dialog-card {
    border-radius: 14px;
    background: linear-gradient(145deg, #ffffff, #f9f9ff);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.dialog-title {
    font-weight: 700;
    color: #2c3e50;
    padding: 15px 20px;
}

.dialog-actions {
    justify-content: flex-end;
    padding: 15px 20px;
}

.text-field {
    margin-bottom: 12px;
}
</style>
