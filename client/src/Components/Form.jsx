import font from "../assets/noto.ttf";
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
Font.register({
  family: "Bangla",
  src: font,
});
const textSize = 10;
const styles = StyleSheet.create({
  title: { marginTop: 15 },
  text: {
    width: "100%",
    textAlign: "center",
    fontFamily: "Bangla",
    fontSize: textSize,
    marginBottom: -4,
  },
  text2: {
    width: "100%",
    textAlign: "center",
    fontFamily: "Bangla",
    textDecoration: "underline",
    paddingBottom: 2,
    fontSize: textSize,
  },
  text3: {
    width: "100%",
    fontFamily: "Bangla",
    paddingBottom: "18px",
    fontSize: textSize,
    textAlign: "left",
    paddingHorizontal: 20,
  },
  text4: {
    width: "100%",
    fontFamily: "Bangla",
    paddingBottom: "18px",
    fontSize: textSize,
    textAlign: "left",
  },
  text5: {
    width: "100%",
    fontFamily: "Bangla",
    paddingBottom: "18px",
    fontSize: textSize,
    textAlign: "center",
  },
  t: { padding: 20, marginTop: -40 },

  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColName: {
    width: "25%", // 100% divided by 7 columns
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColTech: {
    width: "25%", // 100% divided by 7 columns
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol: {
    width: "14%", // 100% divided by 7 columns
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColId: {
    width: "4%", // 100% divided by 7 columns
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColDept: {
    width: "30%", // 100% divided by 7 columns
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColSign: {
    width: "22%", // 100% divided by 7 columns
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },

  tableCell: {
    margin: 0.1,
    fontSize: textSize,
    textAlign: "center",
    fontFamily: "Bangla",
  },
  register: {
    width: "40%",
    fontFamily: "Bangla",
    fontSize: textSize,
    paddingBottom: "14px",
    marginLeft: 350,
    marginTop: 15,
  },
  t2: { padding: 20, marginTop: -52, paddingBottom: 0 },

  Wrapper: {
    padding: 50,
    paddingBottom: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    border: "1px solid black",
    width: "40%",
    padding: 10,
    margin: 10,
    display: "flex",
    flexDirection: "column",
    gap: 40,
  },
  sign: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sign2: {
    width: 150,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
});

export default function Form({ info, depertment = [] }) {
  return (
    <Document>
      <Page size={"A4"}>
        <View style={styles.title}>
          <Text style={styles.text}>গণপ্রজাতন্ত্রী বাংলাদেশ সরকার </Text>
          <Text style={styles.text}>অধ্যক্ষের কার্যালয় </Text>
          <Text style={styles.text}>গ্রাফিক আর্টস ইনস্টিটিউট </Text>
          <Text style={styles.text2}>সাত মসজিদ রোড, ঢাকা-১২০৭ </Text>
          <Text style={styles.text2}>দায় মুক্তি ফর্ম </Text>
        </View>
        <View>
          <Text style={styles.text3}>
            গ্রাফিক আর্টস ইনস্টিটিউটের নিম্মেবর্নিত ছাত্র-ছাত্রীর অধ্যায়ন
            সম্পন্ন হয়েছে/ভর্তি বাতিল হয়েছে / অধ্যায়ন করবে না, ফলে
            ইনস্টিটিউটে উক্ত শিক্ষার্থীর নিকট পাওনাদি সম্পর্কে তথ্যাদি প্রয়োজন
            -{" "}
          </Text>

          <View style={styles.t}>
            <View style={styles.table}>
              {/* Table Row 1 */}
              <View style={styles.tableRow}>
                <View style={styles.tableColName}>
                  <Text style={styles.tableCell}>ছাত্র-ছাত্রীর নামঃ</Text>
                </View>
                <View style={styles.tableColTech}>
                  <Text style={styles.tableCell}> টেকনোলজি </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}> রোল </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>রেজি নং </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>সেশন </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>শিফট </Text>
                </View>
              </View>
              {/* Table Row 2 */}
              <View style={styles.tableRow}>
                <View style={styles.tableColName}>
                  <Text style={styles.tableCell}>{info.Name}</Text>
                </View>
                <View style={styles.tableColTech}>
                  <Text style={styles.tableCell}>{info.Technology}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{info.Roll}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{info.RegistrationNo}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{info.Session}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{info.Shift}</Text>
                </View>
              </View>
            </View>
            <View style={styles.register}>
              <Text style={styles.text}>
                ..........................................
              </Text>
              <Text style={styles.text}>রেজিস্টার </Text>
              <Text style={styles.text}>গ্রাফিক আর্টস ইনস্টিটিউট</Text>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.t2}>
            <View style={styles.table}>
              {/* Table Row 1 */}
              <View style={styles.tableRow}>
                <View style={styles.tableColId}>
                  <Text style={styles.tableCell}>নং </Text>
                </View>
                <View style={styles.tableColDept}>
                  <Text style={styles.tableCell}> বিভাগ/শাখার নাম </Text>
                </View>
                <View style={styles.tableColSign}>
                  <Text style={styles.tableCell}>টিআর/সপ/ল্যাব সহকারী</Text>
                </View>
                <View style={styles.tableColSign}>
                  <Text style={styles.tableCell}>
                    শাখা প্রধান/ওয়ার্ক শপ সুপারের স্বাক্ষরর
                  </Text>
                </View>
                <View style={styles.tableColSign}>
                  <Text style={styles.tableCell}>
                    বিভাগীয় প্রধানের স্বাক্ষরর
                  </Text>
                </View>
              </View>
              {depertment.map((dept) => (
                <View key={Math.random()} style={styles.tableRow}>
                  <View style={styles.tableColId}>
                    <Text style={styles.tableCell}>{dept.id}</Text>
                  </View>
                  <View style={styles.tableColDept}>
                    <Text style={styles.tableCell}>{dept.depertment}</Text>
                  </View>
                  <View style={styles.tableColSign}>
                    <Text style={styles.tableCell}>{""}</Text>
                  </View>
                  <View style={styles.tableColSign}>
                    <Text style={styles.tableCell}>{""}</Text>
                  </View>
                  <View style={styles.tableColSign}>
                    <Text style={styles.tableCell}>{""}</Text>
                  </View>
                </View>
              ))}
            </View>
            <Text style={styles.text4}>
              আমানতের টাকা ........................ হতে টাকা কর্তন করে অবশিষ্ট
              ........................ টাকা ফেরত প্রদান করা জেতে পারে ।
            </Text>
            <View style={styles.sign}>
              <View style={styles.sign2}>
                <Text>.....................</Text>
                <Text style={styles.text}>হিসাব রক্ষক</Text>
              </View>
              <View style={styles.sign2}>
                <Text>.....................</Text>
                <Text style={styles.text}>রেজিস্টার </Text>
              </View>
              <View style={styles.sign2}>
                <Text>.....................</Text>
                <Text style={styles.text}>অধ্যক্ষ </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.Wrapper}>
          <View style={styles.box}>
            <Text style={styles.text}>
              উপরিমতে টাকা .................. মাত্র গ্রহন করলাম
            </Text>
            <View>
              <Text style={styles.text}>.................................</Text>
              <Text style={styles.text}>ছাত্র ছাত্রীর স্বাক্ষর </Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={styles.text}>
              উপরিমতে টাকা .................. মাত্র প্রদান করলাম
            </Text>
            <View>
              <Text style={styles.text}>.................................</Text>
              <Text style={styles.text}> কোষাধক্ষ্য </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
