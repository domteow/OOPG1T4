import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
  } from "@react-pdf/renderer";
  import axios from '../../api/axios'
  import { useState, useEffect, useMemo } from 'react'
  // Create styles
  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#ffffff",
      color: "#262626",
    },
    section: {
      margin: 10,
      padding: 10,
    },
    viewer: {
      width: '100vw', //the pdf viewer will take up all of the width and height
      height: '100vh',
    },
    header : {
        fontSize:'18px',
        fontWeight: '700'
    },
    subheader:{
        fontWeight: '600'
    },
    formcode:{
        fontSize:'12px',
        fontWeight:'500'
    },
    effectiveDate:{
        fontSize:'12px',
        fontStyle:'italic',
        fontWeight:'500'
    }

  });
  
  // Create Document Component
  function BasicDocument() {
    const [form, setForm] = useState({});
    const [questionnaires, setQuestionnaires] = useState([]);

    console.log(form);

    const formId = 1;
    useEffect(() => {
        const getAllForms = async() =>{
            try{
                const response = await axios.get("/api/v1/form/get/id/" + formId)
                console.log([response.data.data]);
                setForm(response.data.data);
                setQuestionnaires(response.data.data.questionnaires)
            }
            catch(error){
                console.log(error);
            }
        }
        getAllForms();
    }, [formId]);

    console.log(questionnaires);

    return (
      <PDFViewer style={styles.viewer}>
        {/* Start of the document*/}
        <Document>
          {/*render a single page*/}
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text style={styles.header}>{form.description}</Text>
              <Text style={styles.formcode}>{form.formCode}</Text>
              <Text style={styles.effectiveDate}>{form.effectiveDate}</Text>
            </View>
            
            {questionnaires.map((questionnaire) => {
                const fields = questionnaire.fields;
                return(
                    <View style={styles.section}>
                    {fields.map((field) => {
                        const question = field.name;
                        const answers = field.value; 
                        const type = field.type;
                        if (type == 'text'){
                            return(
                                <>
                                    <Text>{question}</Text>
                                    <Text>{answers}</Text>
                                </>
                            )
                        }
                        if (type == 'subheader'){
                            return(
                                <>
                                    <Text>{question}</Text>
                                </>
                            )
                        }
                    })}
                    </View>
                )
            })}
            
          </Page>
        </Document>
      </PDFViewer>
    );
  }
  export default BasicDocument;