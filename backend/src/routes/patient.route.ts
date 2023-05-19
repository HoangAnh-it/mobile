import express from 'express'
import * as  patientController  from '../controllers/patient.controller'
const router = express.Router()

router.route("/medical_record")
    .get(patientController.getMedicalRecords)
    .post(patientController.createMedicalRecord)

router.route("/medical_record/:id")
    .patch(patientController.updateMedicalRecord)
    .delete(patientController.deleteMedicalRecord)

router.route("/appointment")
    .post(patientController.makeAnAppointment)
    .get(patientController.getAllAppointments)

router.route("/appointment/:id")
    .delete(patientController.deleteAnAppointment)

export default router;