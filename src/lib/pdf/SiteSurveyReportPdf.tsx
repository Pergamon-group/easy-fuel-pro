import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import type { DocumentProps } from '@react-pdf/renderer';
import type { SiteSurveyData } from '@/data/survey-schema';

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontFamily: 'Helvetica',
    fontSize: 8.5,
    color: '#131b2e',
    backgroundColor: '#ffffff',
  },
  header: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#00658d',
    paddingBottom: 10,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 33,
    objectFit: 'contain',
  },
  brandTitle: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#00658d',
  },
  brandSubtitle: {
    fontSize: 7.5,
    color: '#565d79',
    marginTop: 2,
  },
  badgeContainer: {
    alignItems: 'flex-end',
  },
  refBadge: {
    backgroundColor: '#e6f3fa',
    color: '#00658d',
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 3,
    borderWidth: 0.8,
    borderColor: '#01a3e3',
  },
  dateText: {
    fontSize: 7.5,
    color: '#6e7881',
    marginTop: 3,
  },
  sectionTitle: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    color: '#00658d',
    backgroundColor: '#f0f5fa',
    borderLeftWidth: 3,
    borderLeftColor: '#00658d',
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginTop: 8,
    marginBottom: 5,
    borderRadius: 2,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 3.5,
    alignItems: 'center',
  },
  label: {
    width: 130,
    fontFamily: 'Helvetica-Bold',
    color: '#565d79',
    fontSize: 7.5,
  },
  value: {
    flex: 1,
    color: '#131b2e',
    fontSize: 7.5,
  },
  table: {
    width: '100%',
    marginTop: 5,
    marginBottom: 8,
    borderWidth: 0.8,
    borderColor: '#d4dee8',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f5fa',
    borderBottomWidth: 0.8,
    borderBottomColor: '#d4dee8',
    fontFamily: 'Helvetica-Bold',
    paddingVertical: 3.5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.8,
    borderBottomColor: '#eef2f6',
    paddingVertical: 3.5,
  },
  th: {
    paddingHorizontal: 5,
    fontSize: 7,
    color: '#00658d',
  },
  td: {
    paddingHorizontal: 5,
    fontSize: 7,
    color: '#131b2e',
  },
  internalBox: {
    borderWidth: 0.8,
    borderColor: '#00658d',
    borderStyle: 'dashed',
    padding: 8,
    marginTop: 10,
    borderRadius: 4,
    backgroundColor: '#f7fafe',
  },
  internalTitle: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    color: '#00658d',
    marginBottom: 5,
  },
  signatureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    paddingTop: 8,
  },
  signBlock: {
    width: '46%',
    borderTopWidth: 0.8,
    borderTopColor: '#6e7881',
    paddingTop: 3,
  },
  signTitle: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    color: '#565d79',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 32,
    right: 32,
    borderTopWidth: 0.8,
    borderTopColor: '#d4dee8',
    paddingTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 6.5,
    color: '#6e7881',
  },
});

export interface SiteSurveyReportPdfProps {
  survey: SiteSurveyData;
  referenceCode: string;
  logoBase64?: string;
}

export function SiteSurveyReportPdf({
  survey,
  referenceCode,
  logoBase64,
}: SiteSurveyReportPdfProps): React.ReactElement<DocumentProps> {
  const { businessInfo, scheduling, infrastructure, compliance, readiness } = survey;

  return (
    <Document title={`EasyFuel Pro Site Survey - ${referenceCode}`} author="Pergamon Group">
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            {logoBase64 ? (
              <Image src={logoBase64} style={styles.logo} />
            ) : (
              <View>
                <Text style={styles.brandTitle}>EasyFuel Pro</Text>
                <Text style={styles.brandSubtitle}>Pergamon Group Forecourt Systems</Text>
              </View>
            )}
            <View>
              <Text style={{ fontSize: 7, fontFamily: 'Helvetica-Bold', color: '#00658d' }}>
                TECHNICAL SITE AUDIT REPORT
              </Text>
              <Text style={styles.brandSubtitle}>PTS-2 Automation &amp; eTIMS Readiness Assessment</Text>
            </View>
          </View>
          <View style={styles.badgeContainer}>
            <Text style={styles.refBadge}>{referenceCode}</Text>
            <Text style={styles.dateText}>Generated: {new Date().toLocaleDateString('en-GB')}</Text>
          </View>
        </View>

        {/* Section A: General Business & Site Info */}
        <Text style={styles.sectionTitle}>A. General Site Information</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Customer / Company:</Text>
          <Text style={styles.value}>{businessInfo.customerName || 'N/A'}</Text>
          <Text style={styles.label}>Station / Site Name:</Text>
          <Text style={styles.value}>{businessInfo.siteName || 'N/A'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Physical Location:</Text>
          <Text style={styles.value}>{businessInfo.physicalLocation || 'N/A'}</Text>
          <Text style={styles.label}>County:</Text>
          <Text style={styles.value}>{businessInfo.county || 'N/A'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>KRA PIN:</Text>
          <Text style={styles.value}>{businessInfo.kraPin || 'N/A'}</Text>
          <Text style={styles.label}>Contact Person:</Text>
          <Text style={styles.value}>{businessInfo.contactPersonName || 'N/A'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Contact Phone:</Text>
          <Text style={styles.value}>{businessInfo.contactPhone || 'N/A'}</Text>
          <Text style={styles.label}>Contact Email:</Text>
          <Text style={styles.value}>{businessInfo.contactEmail || 'N/A'}</Text>
        </View>

        {/* Section B: Scheduling */}
        <Text style={styles.sectionTitle}>B. Survey Scheduling &amp; Hours</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Preferred Dates:</Text>
          <Text style={styles.value}>{scheduling.preferredDates.join(', ') || 'Flexible'}</Text>
          <Text style={styles.label}>Operating Hours:</Text>
          <Text style={styles.value}>
            {scheduling.operatingHours === 'custom'
              ? scheduling.customOperatingHours
              : scheduling.operatingHours || 'N/A'}
          </Text>
        </View>
        {scheduling.schedulingNotes ? (
          <View style={styles.row}>
            <Text style={styles.label}>Scheduling Notes:</Text>
            <Text style={styles.value}>{scheduling.schedulingNotes}</Text>
          </View>
        ) : null}

        {/* Section C: Station Setup & Multi-Pump Details */}
        <Text style={styles.sectionTitle}>C. Fueling Infrastructure &amp; Multi-Pump Matrix</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Total Fuel Pumps:</Text>
          <Text style={styles.value}>{infrastructure.totalPumpCount}</Text>
          <Text style={styles.label}>Site Automated:</Text>
          <Text style={styles.value}>{infrastructure.isSiteAutomated === 'yes' ? 'Yes' : 'No'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Operational Mode:</Text>
          <Text style={styles.value}>{infrastructure.operationMode || 'N/A'}</Text>
          <Text style={styles.label}>Automation Vendor:</Text>
          <Text style={styles.value}>{infrastructure.automationVendor || 'N/A'}</Text>
        </View>

        {/* Pump Table with Serial Numbers and Pulse Output */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.th, { width: '12%' }]}>Pump #</Text>
            <Text style={[styles.th, { width: '20%' }]}>Dispenser Serial #</Text>
            <Text style={[styles.th, { width: '22%' }]}>Make / Model</Text>
            <Text style={[styles.th, { width: '12%' }]}>Nozzles</Text>
            <Text style={[styles.th, { width: '16%' }]}>Fuel Types</Text>
            <Text style={[styles.th, { width: '10%' }]}>Meter</Text>
            <Text style={[styles.th, { width: '8%' }]}>Pulse</Text>
          </View>
          {infrastructure.pumps.length > 0 ? (
            infrastructure.pumps.map((pump, idx) => (
              <View style={styles.tableRow} key={pump.id || idx}>
                <Text style={[styles.td, { width: '12%' }]}>Pump {idx + 1}</Text>
                <Text style={[styles.td, { width: '20%' }]}>{pump.dispenserSerial || '—'}</Text>
                <Text style={[styles.td, { width: '22%' }]}>{pump.makeModel || 'N/A'}</Text>
                <Text style={[styles.td, { width: '12%' }]}>{pump.nozzleCount} Nozzles</Text>
                <Text style={[styles.td, { width: '16%' }]}>
                  {pump.fuelTypes.map((f) => f === 'other' ? (pump.otherFuelType ? `Other (${pump.otherFuelType})` : 'Other') : f.toUpperCase()).join(', ') || 'N/A'}
                </Text>
                <Text style={[styles.td, { width: '10%' }]}>{pump.meterType || 'N/A'}</Text>
                <Text style={[styles.td, { width: '8%' }]}>{pump.pulseOutputAvailable === 'yes' ? 'Yes' : 'No'}</Text>
              </View>
            ))
          ) : (
            <View style={styles.tableRow}>
              <Text style={[styles.td, { width: '100%', textAlign: 'center' }]}>No pump cards configured</Text>
            </View>
          )}
        </View>

        {/* Section D: Compliance & Network */}
        <Text style={styles.sectionTitle}>D. eTIMS Compliance &amp; Connectivity</Text>
        <View style={styles.row}>
          <Text style={styles.label}>eTIMS Solution:</Text>
          <Text style={styles.value}>{(compliance.etimsSolutionType || 'N/A').toUpperCase()}</Text>
          <Text style={styles.label}>Integration Method:</Text>
          <Text style={styles.value}>{compliance.etimsIntegrationMethod || 'N/A'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>POS System:</Text>
          <Text style={styles.value}>{compliance.posSystem || 'N/A'}</Text>
          <Text style={styles.label}>Compliant Receipts:</Text>
          <Text style={styles.value}>{compliance.generatesCompliantReceipts === 'yes' ? 'Yes' : 'No'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Live KRA Today:</Text>
          <Text style={styles.value}>
            {compliance.realTimeSalesCurrentlyTransmitting === 'yes'
              ? 'Yes (Active Today)'
              : 'No / In Planning'}
          </Text>
          <Text style={styles.label}>Automate Live KRA:</Text>
          <Text style={styles.value}>
            {compliance.requireRealtimeTransmissionGoal === 'yes' ? 'Yes (Mandatory Goal)' : 'Standard'}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Internet Available:</Text>
          <Text style={styles.value}>{compliance.internetAvailable === 'yes' ? `Yes (${compliance.connectionType})` : 'No'}</Text>
          <Text style={styles.label}>Network Redundancy:</Text>
          <Text style={styles.value}>{compliance.networkRedundancy === 'yes' ? 'Yes' : 'No'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>UPS / Power Backup:</Text>
          <Text style={styles.value}>{compliance.upsPowerBackup === 'yes' ? 'Yes' : 'No'}</Text>
          <Text style={styles.label}>LAN in Place:</Text>
          <Text style={styles.value}>{compliance.lanInPlace === 'yes' ? 'Yes' : 'No'}</Text>
        </View>

        {/* Section E: Civil Works & Site Readiness */}
        <Text style={styles.sectionTitle}>E. Civil Works &amp; Forecourt Readiness</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Trenching Completed:</Text>
          <Text style={styles.value}>{readiness.trenchingCompleted === 'yes' ? 'Yes' : 'No'}</Text>
          <Text style={styles.label}>Conduits Secured:</Text>
          <Text style={styles.value}>{readiness.conduitsInstalled === 'yes' ? 'Yes' : 'No'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Pump Islands Grounded:</Text>
          <Text style={styles.value}>{readiness.pumpIslandsGrounded === 'yes' ? 'Yes' : 'No'}</Text>
          <Text style={styles.label}>Uploaded Assets:</Text>
          <Text style={styles.value}>{readiness.uploadedImageIds.length} files attached</Text>
        </View>
        {readiness.siteNotes ? (
          <View style={styles.row}>
            <Text style={styles.label}>Technician Notes:</Text>
            <Text style={styles.value}>{readiness.siteNotes}</Text>
          </View>
        ) : null}

        {/* Section F: Company Internal Sign-Off */}
        <View style={styles.internalBox}>
          <Text style={styles.internalTitle}>F. Internal Pergamon Engineering Sign-Off (Internal Audit Review)</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Assigned Engineer:</Text>
            <Text style={styles.value}>____________________________________________</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date of Audit:</Text>
            <Text style={styles.value}>____________________________________________</Text>
          </View>
          <View style={styles.signatureRow}>
            <View style={styles.signBlock}>
              <Text style={styles.signTitle}>Pergamon Lead Deployment Engineer</Text>
              <Text style={{ fontSize: 6.5, color: '#6e7881', marginTop: 12 }}>Signature &amp; Stamp</Text>
            </View>
            <View style={styles.signBlock}>
              <Text style={styles.signTitle}>Client Station Representative</Text>
              <Text style={{ fontSize: 6.5, color: '#6e7881', marginTop: 12 }}>Signature &amp; Date</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>EasyFuel Pro &bull; Industrial Forecourt Automation &bull; easyfuelpro.com</Text>
          <Text>Pergamon Group &bull; Springette Office Park, Nairobi &bull; info@pergamongroup.com</Text>
        </View>
      </Page>
    </Document>
  );
}
