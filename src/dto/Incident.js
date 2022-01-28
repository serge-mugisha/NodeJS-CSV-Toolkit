/**
 * Class to create an Incident record object
 */
// Pipeline Incidents Records Data Transfer Object (Model)
class Incident {
  
  /** 
   * @param {string} incidentNumber - Incident Number QWERT
   * @param {string} incidentType
   * @param {string} reportedDate
   * @param {string} nearestPopulatedCentre
   * @param {string} province
   * @param {string} company
   * @param {string} substance
   * @param {string} significant
   * @param {string} whatHappenedCategory
   */
  constructor(incidentNumber, incidentTypes, reportedDate, nearestPopulatedCentre, province, company, substance, significant, whatHappenedCategory) {
    
    this.incidentNumber = incidentNumber;
    this.incidentTypes = incidentTypes;
    this.reportedDate = reportedDate;
    this.nearestPopulatedCentre = nearestPopulatedCentre;
    this.province = province;
    this.company = company;
    this.substance = substance;
    this.significant = significant;
    this.whatHappenedCategory = whatHappenedCategory;
  }
}

module.exports = Incident
