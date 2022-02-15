/**
 * Incident.js
 * Contains the Model part code of the MVC, stores the model data structure
 * Class to create an Incident record object
 * Program by Serge Mugisha
*/
// Pipeline Incidents Records Data Transfer Object (Model)
class Incident {
  
  /** 
   * @param {string} incidentNumber - Incident Number
   * @param {string} incidentType - Incident type
   * @param {string} reportedDate - Incident reported Date
   * @param {string} nearestPopulatedCentre - Incident nearest Populated Centre
   * @param {string} province - Province where incident took place
   * @param {string} company - Company where incident took place
   * @param {string} substance - Substance included in the incident
   * @param {string} significant - If the incident is significant (Yes/No)
   * @param {string} whatHappenedCategory - Category of what happened
   */
  constructor(incidentNumber, incidentType, reportedDate, nearestPopulatedCentre, province, company, substance, significant, whatHappenedCategory) {
    
    this.incidentNumber = incidentNumber;
    this.incidentType = incidentType;
    this.reportedDate = reportedDate;
    this.nearestPopulatedCentre = nearestPopulatedCentre;
    this.province = province;
    this.company = company;
    this.substance = substance;
    this.significant = significant;
    this.whatHappenedCategory = whatHappenedCategory;
  }

  // incidentNumber: String, incidentType: String, reportedDate: String, nearestPopulatedCentre: String, province: String, company: String, substance: String, significant: String, whatHappenedCategory: String

  // get incidentNumber () { return this.incidentNumber }
  // set incidentNumber (incidentNumber) { this.incidentNumber = incidentNumber }

  // get incidentType () { return this.incidentType }
  // set incidentType (incidentType) { this.incidentType = incidentType }

  // get reportedDate () { return this.reportedDate }
  // set reportedDate (reportedDate) { this.reportedDate = reportedDate }

  // get nearestPopulatedCentre () { return this.nearestPopulatedCentre }
  // set nearestPopulatedCentre (nearestPopulatedCentre) { this.nearestPopulatedCentre = nearestPopulatedCentre }

  // get province () { return this.province }
  // set province (province) { this.province = province }

  // get company () { return this.company }
  // set company (company) { this.company = company }

  // get substance () { return this.substance }
  // set substance (substance) { this.substance = substance }

  // get significant () { return this.significant }
  // set significant (significant) { this.significant = significant }

  // get whatHappenedCategory () { return this.whatHappenedCategory }
  // set whatHappenedCategory (whatHappenedCategory) { this.whatHappenedCategory = whatHappenedCategory }

}

module.exports = Incident
