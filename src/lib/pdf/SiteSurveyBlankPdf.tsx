import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import type { DocumentProps } from '@react-pdf/renderer';

export interface SiteSurveyBlankPdfProps {
  logoBase64?: string;
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 28,
    paddingBottom: 28,
    paddingHorizontal: 32,
    fontFamily: 'Helvetica',
    fontSize: 8,
    color: '#131b2e',
    backgroundColor: '#ffffff',
  },
  header: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#00658d',
    paddingBottom: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 120,
    height: 33,
    objectFit: 'contain',
  },
  headerTextGroup: {
    flexDirection: 'column',
  },
  brandTitle: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: '#00658d',
  },
  brandSubtitle: {
    fontSize: 7,
    color: '#565d79',
    marginTop: 1,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  docBadge: {
    backgroundColor: '#e6f3fa',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#01a3e3',
  },
  docBadgeText: {
    fontSize: 6.5,
    fontFamily: 'Helvetica-Bold',
    color: '#00658d',
    textTransform: 'uppercase',
  },
  docTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#131b2e',
    marginTop: 2,
    textAlign: 'right',
  },
  docSubTitle: {
    fontSize: 6.5,
    color: '#565d79',
    textAlign: 'right',
  },
  sectionTitle: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    color: '#00658d',
    backgroundColor: '#f0f5fa',
    borderLeftWidth: 3,
    borderLeftColor: '#00658d',
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginTop: 6,
    marginBottom: 5,
  },
  eduBox: {
    backgroundColor: '#f4f8fb',
    borderLeftWidth: 2.5,
    borderLeftColor: '#01a3e3',
    padding: 5,
    marginBottom: 6,
    borderRadius: 2,
  },
  eduTitle: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: '#00658d',
    marginBottom: 1.5,
  },
  eduText: {
    fontSize: 6.5,
    color: '#3e4850',
    lineHeight: 1.3,
  },
  fieldRow: {
    flexDirection: 'row',
    marginBottom: 4.5,
    alignItems: 'center',
  },
  fieldLabel: {
    width: 145,
    fontFamily: 'Helvetica-Bold',
    color: '#565d79',
    fontSize: 7.5,
  },
  fieldLine: {
    flex: 1,
    borderBottomWidth: 0.8,
    borderBottomColor: '#bdc8d1',
    height: 11,
  },
  checkboxGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  box: {
    width: 8,
    height: 8,
    borderWidth: 0.8,
    borderColor: '#565d79',
    marginRight: 3.5,
    borderRadius: 1,
  },
  notesBox: {
    marginTop: 3,
    marginBottom: 4,
  },
  notesLabel: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: '#565d79',
    marginBottom: 2,
  },
  notesLines: {
    borderBottomWidth: 0.8,
    borderBottomColor: '#d4dee8',
    height: 12,
    marginBottom: 3,
  },
  pumpCard: {
    borderWidth: 0.8,
    borderColor: '#d4dee8',
    borderRadius: 3,
    marginBottom: 4.5,
    backgroundColor: '#ffffff',
  },
  pumpCardHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    borderBottomWidth: 0.8,
    borderBottomColor: '#e2e7ff',
    paddingVertical: 3,
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  pumpCardTitle: {
    width: 65,
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    color: '#00658d',
  },
  pumpCardSerialLabel: {
    width: 75,
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: '#565d79',
  },
  pumpCardSerialLine: {
    width: 110,
    borderBottomWidth: 0.8,
    borderBottomColor: '#bdc8d1',
    height: 10,
    marginRight: 10,
  },
  pumpCardMakeLabel: {
    width: 65,
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: '#565d79',
  },
  pumpCardMakeLine: {
    flex: 1,
    borderBottomWidth: 0.8,
    borderBottomColor: '#bdc8d1',
    height: 10,
  },
  pumpCardBody: {
    flexDirection: 'row',
    paddingVertical: 3,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footer: {
    position: 'absolute',
    bottom: 14,
    left: 32,
    right: 32,
    borderTopWidth: 0.8,
    borderTopColor: '#d4dee8',
    paddingTop: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 6.5,
    color: '#6e7881',
  },
  signBlock: {
    width: '48%',
    borderWidth: 0.8,
    borderColor: '#d4dee8',
    borderRadius: 3,
    padding: 6,
  },
  stampBox: {
    width: 90,
    height: 48,
    borderWidth: 0.8,
    borderColor: '#bdc8d1',
    borderStyle: 'dashed',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
});

export function SiteSurveyBlankPdf({ logoBase64 }: SiteSurveyBlankPdfProps = {}): React.ReactElement<DocumentProps> {
  return (
    <Document title="EasyFuel Pro - Fuel Setup & eTIMS Compliance Checklist" author="Pergamon Group">
      {/* ── PAGE 1: Site Info & Automation Status ── */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {logoBase64 ? (
              <Image src={logoBase64} style={styles.logo} />
            ) : (
              <View style={styles.headerTextGroup}>
                <Text style={styles.brandTitle}>EasyFuel Pro</Text>
                <Text style={styles.brandSubtitle}>By Pergamon Group Ltd</Text>
              </View>
            )}
            <View style={styles.headerTextGroup}>
              <Text style={{ fontSize: 7, fontFamily: 'Helvetica-Bold', color: '#00658d' }}>
                Pergamon Group &bull; Forecourt Automation Systems
              </Text>
              <Text style={styles.brandSubtitle}>
                Springette Office Park, Nairobi &bull; info@easyfuelpro.com &bull; +254 111 050 950
              </Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.docBadge}>
              <Text style={styles.docBadgeText}>Official Engineering Audit</Text>
            </View>
            <Text style={styles.docTitle}>SITE SURVEY CHECKLIST</Text>
            <Text style={styles.docSubTitle}>Document Ref: EFP-CHK-2025</Text>
          </View>
        </View>

        {/* Section A */}
        <Text style={styles.sectionTitle}>A. General Site Information</Text>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Customer / Company Name:</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Site / Station Name:</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Physical Location & Street:</Text>
          <View style={styles.fieldLine} />
          <Text style={[styles.fieldLabel, { width: 65, marginLeft: 12 }]}>County:</Text>
          <View style={[styles.fieldLine, { flex: 0.6 }]} />
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>KRA PIN (Corporate / Individual):</Text>
          <View style={styles.fieldLine} />
          <Text style={[styles.fieldLabel, { width: 90, marginLeft: 12 }]}>Date of Survey:</Text>
          <View style={[styles.fieldLine, { flex: 0.6 }]} />
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Engineer / Manager In-Charge:</Text>
          <View style={styles.fieldLine} />
          <Text style={[styles.fieldLabel, { width: 90, marginLeft: 12 }]}>Contact Phone:</Text>
          <View style={[styles.fieldLine, { flex: 0.6 }]} />
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Contact Email Address:</Text>
          <View style={styles.fieldLine} />
        </View>

        {/* Educational Callout 1 */}
        <View style={[styles.eduBox, { marginTop: 8 }]}>
          <Text style={styles.eduTitle}>
            Engineering Guide: Forecourt Automation &amp; Operating Modes
          </Text>
          <Text style={styles.eduText}>
            Automated forecourts connect dispenser computers directly to a centralized controller (e.g., PTS-2), capturing real-time liters dispensed and sending electronic fiscal signatures to KRA. Semi-automated sites feature standalone card POS or manual dipping without live pump interlocks. Manual sites rely entirely on mechanical totalizer registers and attendant book-entry.
          </Text>
        </View>

        {/* Section B */}
        <Text style={styles.sectionTitle}>B. Site Automation &amp; Operational Status</Text>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Is the site currently automated?</Text>
          <View style={styles.checkboxGroup}>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>Yes (Automated)</Text></View>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>No (Manual / Standalone)</Text></View>
          </View>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Current Mode of Operation:</Text>
          <View style={styles.checkboxGroup}>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>Fully Automated</Text></View>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>Semi-Automated</Text></View>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>Manual (No Controller)</Text></View>
          </View>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Automation System / Vendor in Use:</Text>
          <View style={styles.fieldLine} />
        </View>

        <View style={styles.notesBox}>
          <Text style={styles.notesLabel}>Section B &bull; Technician Notes on Current Operations:</Text>
          <View style={styles.notesLines} />
          <View style={styles.notesLines} />
        </View>

        <View style={styles.footer}>
          <Text>EasyFuel Pro &bull; by Pergamon Group Ltd &bull; Page 1 of 4</Text>
          <Text>Submit online: easyfuelpro.com/site-survey &bull; Email: info@easyfuelpro.com</Text>
        </View>
      </Page>

      {/* ── PAGE 2: Fueling Infrastructure (Pumps & Dispensers Matrix) ── */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {logoBase64 ? (
              <Image src={logoBase64} style={styles.logo} />
            ) : (
              <Text style={styles.brandTitle}>EasyFuel Pro</Text>
            )}
            <Text style={{ fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: '#00658d' }}>
              Forecourt Fueling Infrastructure &amp; Multi-Nozzle Dispensers
            </Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={{ fontSize: 7, fontFamily: 'Helvetica-Bold', color: '#565d79' }}>PAGE 2 OF 4</Text>
          </View>
        </View>

        {/* Educational Callout 2 */}
        <View style={styles.eduBox}>
          <Text style={styles.eduTitle}>
            Engineering Guide: Dispensers, Pulsers &amp; Protocols (IFSF, PMS, AGO, IK)
          </Text>
          <Text style={styles.eduText}>
            Electronic dispensers contain microprocessor electronic calculators that transmit volumetric meter signals via serial loop (Current Loop, RS-485, or IFSF — International Forecourt Standards Forum). Common fuel grades include PMS (Premium Motor Spirit / Super Petrol), AGO (Automotive Gas Oil / Diesel), IK (Illuminating Kerosene / Paraffin), and LPG. Mechanical pumps feature rotating mechanical totalizers that require an external electro-mechanical pulser retrofit head.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>C. Fueling Infrastructure (Dispensers &amp; Pumps Matrix)</Text>
        <View style={[styles.fieldRow, { marginBottom: 6 }]}>
          <Text style={[styles.fieldLabel, { width: 95 }]}>Total Fuel Pumps:</Text>
          <View style={[styles.fieldLine, { width: 45, flex: 'none', marginRight: 15 }]} />
          <Text style={[styles.fieldLabel, { width: 110 }]}>Total Dispensers:</Text>
          <View style={[styles.fieldLine, { width: 45, flex: 'none', marginRight: 15 }]} />
          <Text style={[styles.fieldLabel, { width: 95 }]}>Total Active Nozzles:</Text>
          <View style={[styles.fieldLine, { width: 45, flex: 'none' }]} />
        </View>

        {/* 2-Tier Dispenser Matrix (Dispensers 1 to 8) */}
        {[1, 2, 3, 4, 5, 6, 7, 8].map((pumpIdx) => (
          <View key={pumpIdx} style={styles.pumpCard}>
            {/* Tier 1: ID, Serial No, Make/Model */}
            <View style={styles.pumpCardHeader}>
              <Text style={styles.pumpCardTitle}>Pump {pumpIdx}</Text>
              <Text style={styles.pumpCardSerialLabel}>Dispenser Serial #:</Text>
              <View style={styles.pumpCardSerialLine} />
              <Text style={styles.pumpCardMakeLabel}>Make / Model:</Text>
              <View style={styles.pumpCardMakeLine} />
            </View>

            {/* Tier 2: Nozzles, Fuel Grades, Meter Type, Pulse Output */}
            <View style={styles.pumpCardBody}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 7, fontFamily: 'Helvetica-Bold', color: '#565d79', marginRight: 3 }}>Nozzles:</Text>
                <View style={{ width: 20, borderBottomWidth: 0.8, borderBottomColor: '#bdc8d1', height: 9, marginRight: 6 }} />
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 6 }}>
                <Text style={{ fontSize: 7, fontFamily: 'Helvetica-Bold', color: '#565d79', marginRight: 4 }}>Fuels:</Text>
                <View style={styles.checkboxItem}><View style={styles.box} /><Text style={{ fontSize: 6.5 }}>PMS</Text></View>
                <View style={styles.checkboxItem}><View style={styles.box} /><Text style={{ fontSize: 6.5 }}>AGO</Text></View>
                <View style={styles.checkboxItem}><View style={styles.box} /><Text style={{ fontSize: 6.5 }}>IK</Text></View>
                <View style={styles.checkboxItem}><View style={styles.box} /><Text style={{ fontSize: 6.5 }}>LPG</Text></View>
                <View style={styles.checkboxItem}><View style={styles.box} /><Text style={{ fontSize: 6.5 }}>Other: _____</Text></View>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 6 }}>
                <Text style={{ fontSize: 7, fontFamily: 'Helvetica-Bold', color: '#565d79', marginRight: 4 }}>Meter:</Text>
                <View style={styles.checkboxItem}><View style={styles.box} /><Text style={{ fontSize: 6.5 }}>Electronic</Text></View>
                <View style={styles.checkboxItem}><View style={styles.box} /><Text style={{ fontSize: 6.5 }}>Mechanical</Text></View>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 7, fontFamily: 'Helvetica-Bold', color: '#00658d', marginRight: 4 }}>Pulse Output?</Text>
                <View style={styles.checkboxItem}><View style={styles.box} /><Text style={{ fontSize: 6.5 }}>Yes</Text></View>
                <View style={styles.checkboxItem}><View style={styles.box} /><Text style={{ fontSize: 6.5 }}>No</Text></View>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.notesBox}>
          <Text style={styles.notesLabel}>Section C &bull; Additional Forecourt &amp; Pump Notes (Satellite, High-Flow, or Extra Pumps):</Text>
          <View style={styles.notesLines} />
        </View>

        <View style={styles.footer}>
          <Text>EasyFuel Pro &bull; by Pergamon Group Ltd &bull; Page 2 of 4</Text>
          <Text>Submit online: easyfuelpro.com/site-survey &bull; Email: info@easyfuelpro.com</Text>
        </View>
      </Page>

      {/* ── PAGE 3: eTIMS Compliance & Network Connectivity ── */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {logoBase64 ? (
              <Image src={logoBase64} style={styles.logo} />
            ) : (
              <Text style={styles.brandTitle}>EasyFuel Pro</Text>
            )}
            <Text style={{ fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: '#00658d' }}>
              eTIMS (KRA) Fiscal Requirements &amp; Connectivity
            </Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={{ fontSize: 7, fontFamily: 'Helvetica-Bold', color: '#565d79' }}>PAGE 3 OF 4</Text>
          </View>
        </View>

        {/* Educational Callout 3 */}
        <View style={styles.eduBox}>
          <Text style={styles.eduTitle}>
            Engineering Guide: KRA eTIMS System-to-System Integration (VSCU vs OSCU)
          </Text>
          <Text style={styles.eduText}>
            VSCU (Virtual Sales Control Unit) and OSCU (Online Sales Control Unit) are the two system-to-system integration methods provided by the KRA for eTIMS compliance. The primary distinction lies in connectivity and hardware requirements. VSCU is a cloud-based software solution that allows for offline signing and batch synchronization, making it ideal for high-volume forecourts, wholesalers, or operations with intermittent internet connectivity. In contrast, OSCU requires a continuous real-time online connection to sign invoices immediately at the point of sale. EasyFuel Pro implicitly offers VSCU architecture so your forecourt continues dispensing fuel smoothly even during network outages.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>D. eTIMS (KRA) Compliance Requirements</Text>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Client eTIMS Solution Type:</Text>
          <View style={styles.checkboxGroup}>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>VSCU (Virtual - EasyFuel Default)</Text></View>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>OSCU (Online POS Real-Time)</Text></View>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>Need Advice</Text></View>
          </View>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>eTIMS Integration Method:</Text>
          <View style={styles.checkboxGroup}>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>Direct API Integration</Text></View>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>Middleware / POS Integration</Text></View>
          </View>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>POS System in Use:</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>System generates eTIMS Receipts?</Text>
          <View style={styles.checkboxGroup}>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>Yes</Text></View>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>No</Text></View>
          </View>
          <Text style={[styles.fieldLabel, { width: 145, marginLeft: 16 }]}>Mandatory QR &amp; CU on Receipts?</Text>
          <View style={styles.checkboxGroup}>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>Yes</Text></View>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>No</Text></View>
          </View>
        </View>

        {/* Unambiguous Two-Part KRA Question */}
        <View style={[styles.fieldRow, { backgroundColor: '#f8fafc', padding: 4, borderRadius: 2, marginVertical: 3 }]}>
          <Text style={[styles.fieldLabel, { width: 220, color: '#00658d' }]}>
            1. Current Status: Are sales transmitting to KRA in real-time today?
          </Text>
          <View style={styles.checkboxGroup}>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>Yes, currently transmitting</Text></View>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>No / Not yet operational</Text></View>
          </View>
        </View>
        <View style={[styles.fieldRow, { backgroundColor: '#f8fafc', padding: 4, borderRadius: 2, marginBottom: 5 }]}>
          <Text style={[styles.fieldLabel, { width: 220, color: '#00658d' }]}>
            2. Project Objective: Do you require EasyFuel Pro to automate live KRA transmission?
          </Text>
          <View style={styles.checkboxGroup}>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>Yes, mandatory requirement</Text></View>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>No (Local storage only)</Text></View>
          </View>
        </View>

        <View style={styles.notesBox}>
          <Text style={styles.notesLabel}>Section D &bull; Fiscalization / KRA Transition Notes:</Text>
          <View style={styles.notesLines} />
        </View>

        {/* Educational Callout 4 */}
        <View style={[styles.eduBox, { marginTop: 6 }]}>
          <Text style={styles.eduTitle}>
            Engineering Guide: Network Redundancy &amp; Offline Buffering
          </Text>
          <Text style={styles.eduText}>
            PTS-2 controllers maintain an internal offline flash buffer (up to 50,000 transactions) so forecourts dispense continuously during network blackouts. However, having redundant 4G/5G cellular failover paired with fixed broadband guarantees immediate real-time invoice generation and avoids backlog spikes.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>E. Network &amp; Connectivity</Text>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Internet Available on Site?</Text>
          <View style={styles.checkboxGroup}>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>Yes</Text></View>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>No</Text></View>
          </View>
          <Text style={[styles.fieldLabel, { width: 110, marginLeft: 20 }]}>Primary Link Type:</Text>
          <View style={styles.checkboxGroup}>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>Fiber</Text></View>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>4G / 5G</Text></View>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>DSL</Text></View>
          </View>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Network Redundancy Available (Backup Link)?</Text>
          <View style={styles.checkboxGroup}>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>Yes</Text></View>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>No</Text></View>
          </View>
          <Text style={[styles.fieldLabel, { width: 110, marginLeft: 20 }]}>Local LAN in Place?</Text>
          <View style={styles.checkboxGroup}>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>Yes</Text></View>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>No</Text></View>
          </View>
        </View>

        <View style={styles.notesBox}>
          <Text style={styles.notesLabel}>Section E &bull; Network &amp; Cabling Notes:</Text>
          <View style={styles.notesLines} />
        </View>

        <View style={styles.footer}>
          <Text>EasyFuel Pro &bull; by Pergamon Group Ltd &bull; Page 3 of 4</Text>
          <Text>Submit online: easyfuelpro.com/site-survey &bull; Email: info@easyfuelpro.com</Text>
        </View>
      </Page>

      {/* ── PAGE 4: Hardware, Civil Works & Official Sign-Off ── */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {logoBase64 ? (
              <Image src={logoBase64} style={styles.logo} />
            ) : (
              <Text style={styles.brandTitle}>EasyFuel Pro</Text>
            )}
            <Text style={{ fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: '#00658d' }}>
              Hardware, Civil Readiness &amp; Official Sign-Off
            </Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={{ fontSize: 7, fontFamily: 'Helvetica-Bold', color: '#565d79' }}>PAGE 4 OF 4</Text>
          </View>
        </View>

        {/* Section F */}
        <Text style={styles.sectionTitle}>F. Hardware &amp; System Infrastructure</Text>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>POS Terminals Installed:</Text>
          <View style={styles.checkboxGroup}>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>Yes</Text></View>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>No</Text></View>
          </View>
          <Text style={[styles.fieldLabel, { width: 145, marginLeft: 20 }]}>Automation Controller Installed:</Text>
          <View style={styles.checkboxGroup}>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>Yes</Text></View>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>No</Text></View>
          </View>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Control Unit Location Secured:</Text>
          <View style={styles.checkboxGroup}>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>Yes</Text></View>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>No</Text></View>
          </View>
          <Text style={[styles.fieldLabel, { width: 145, marginLeft: 20 }]}>UPS / Power Backup Available?</Text>
          <View style={styles.checkboxGroup}>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>Yes</Text></View>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>No</Text></View>
          </View>
        </View>

        {/* Section G */}
        <Text style={styles.sectionTitle}>G. Civil &amp; Physical Works</Text>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Trenching Completed for Data/Power Cables?</Text>
          <View style={styles.checkboxGroup}>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>Yes</Text></View>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>No</Text></View>
          </View>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Conduits Installed and Secured?</Text>
          <View style={styles.checkboxGroup}>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>Yes</Text></View>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>No</Text></View>
          </View>
          <Text style={[styles.fieldLabel, { width: 145, marginLeft: 20 }]}>Pump Islands Properly Grounded?</Text>
          <View style={styles.checkboxGroup}>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>Yes</Text></View>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>No</Text></View>
          </View>
        </View>

        {/* Section H / I */}
        <Text style={styles.sectionTitle}>H. Technician Observations &amp; Documentation</Text>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Forecourt Images Attached (Pumps, Dispensers, Control Unit, LAN)?</Text>
          <View style={styles.checkboxGroup}>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>Yes, Attached</Text></View>
            <View style={styles.checkboxItem}><View style={styles.box} /><Text>No Images</Text></View>
          </View>
        </View>
        <View style={styles.notesBox}>
          <Text style={styles.notesLabel}>Site Survey Notes &amp; Engineer Observations:</Text>
          <View style={styles.notesLines} />
          <View style={styles.notesLines} />
          <View style={styles.notesLines} />
          <View style={styles.notesLines} />
        </View>

        {/* Section J: Official Sign-Off */}
        <Text style={styles.sectionTitle}>J. Official Survey Sign-Off &amp; Verification</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
          {/* Technician Sign-Off */}
          <View style={styles.signBlock}>
            <Text style={{ fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: '#00658d', marginBottom: 4 }}>
              Pergamon / Surveying Field Engineer:
            </Text>
            <View style={[styles.fieldRow, { marginBottom: 3 }]}>
              <Text style={{ width: 45, fontSize: 7, color: '#565d79', fontFamily: 'Helvetica-Bold' }}>Name:</Text>
              <View style={styles.fieldLine} />
            </View>
            <View style={[styles.fieldRow, { marginBottom: 3 }]}>
              <Text style={{ width: 45, fontSize: 7, color: '#565d79', fontFamily: 'Helvetica-Bold' }}>Signature:</Text>
              <View style={styles.fieldLine} />
            </View>
            <View style={[styles.fieldRow, { marginBottom: 3 }]}>
              <Text style={{ width: 45, fontSize: 7, color: '#565d79', fontFamily: 'Helvetica-Bold' }}>Date:</Text>
              <View style={styles.fieldLine} />
            </View>
          </View>

          {/* Client Sign-Off */}
          <View style={styles.signBlock}>
            <Text style={{ fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: '#00658d', marginBottom: 4 }}>
              Client / Station Representative:
            </Text>
            <View style={[styles.fieldRow, { marginBottom: 3 }]}>
              <Text style={{ width: 45, fontSize: 7, color: '#565d79', fontFamily: 'Helvetica-Bold' }}>Name:</Text>
              <View style={styles.fieldLine} />
            </View>
            <View style={[styles.fieldRow, { marginBottom: 3 }]}>
              <Text style={{ width: 45, fontSize: 7, color: '#565d79', fontFamily: 'Helvetica-Bold' }}>Signature:</Text>
              <View style={styles.fieldLine} />
            </View>
            <View style={[styles.fieldRow, { marginBottom: 3 }]}>
              <Text style={{ width: 45, fontSize: 7, color: '#565d79', fontFamily: 'Helvetica-Bold' }}>Date:</Text>
              <View style={styles.fieldLine} />
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>EasyFuel Pro &bull; by Pergamon Group Ltd &bull; Page 4 of 4</Text>
          <Text>Submit online: easyfuelpro.com/site-survey &bull; Email: info@easyfuelpro.com</Text>
        </View>
      </Page>
    </Document>
  );
}
