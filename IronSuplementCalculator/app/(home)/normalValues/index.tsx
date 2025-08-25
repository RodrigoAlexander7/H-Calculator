import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Row, Rows, Table } from "react-native-table-component";

export default function ExampleOne() {
   const [tableHead] = useState([
      "Población",
      "Anemia Severa",
      "Anemia Moderada",
      "Anemia Leve",
      "Sin Anemia",
   ]);

   const [tableData] = useState([
      ["Prematuros/as - 1ª semana de vida", "≤ 13.0", "-", "-", "> 13.0"],
      ["Prematuros/as - 2ª a 4ª semana", "≤ 10.0", "-", "-", "> 10.0"],
      ["Prematuros/as - 5ª a 8ª semana", "≤ 8.0", "-", "-", "> 8.0"],
      ["Nacidos/as a término < 2 meses", "≤ 13.5", "-", "-", "13.5 – 18.5"],
      ["Niños 2 a 5 meses", "≤ 9.5", "-", "-", "9.5 – 13.5"],
      ["Niños 6 a 23 meses", "< 7.0", "7.0 – 9.4", "9.5 – 10.4", "≥ 10.5"],
      ["Niños 24 a 59 meses", "< 7.0", "7.0 – 9.9", "10.0 – 10.9", "≥ 11.0"],
      ["Niños 5 a 11 años", "< 8.0", "8.0 – 10.9", "11.0 – 11.4", "≥ 11.5"],
      ["Adolescentes mujeres 12–14 años", "< 8.0", "8.0 – 10.9", "11.0 – 11.9", "≥ 12.0"],
      ["Adolescentes varones 12–14 años", "< 8.0", "8.0 – 10.9", "11.0 – 11.9", "≥ 12.0"],
      ["Varones 15+ años", "< 8.0", "8.0 – 10.9", "11.0 – 12.9", "≥ 13.0"],
      ["Mujeres NO gestantes 15+ años", "< 8.0", "8.0 – 10.9", "11.0 – 11.9", "≥ 12.0"],
      ["Gestantes 1er trimestre", "< 7.0", "7.0 – 9.9", "10.0 – 10.9", "≥ 11.0"],
      ["Gestantes 2º trimestre", "< 7.0", "7.0 – 9.4", "9.5 – 10.4", "≥ 10.5"],
      ["Gestantes 3er trimestre", "< 7.0", "7.0 – 9.9", "10.0 – 10.9", "≥ 11.0"],
      ["Puérperas", "< 8.0", "8.0 – 10.9", "11.0 – 11.9", "≥ 12.0"],
   ]);


   return (
      <ScrollView>
         <View style={styles.container}>
            <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
               <Row data={tableHead} style={styles.head} textStyle={styles.text} />
               <Rows data={tableData} textStyle={styles.text} />
            </Table>
         </View>
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
   head: { height: 40, backgroundColor: "#f1f8ff" },
   text: { margin: 6, textAlign: "center" },
});
