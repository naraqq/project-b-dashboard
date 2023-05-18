import { useLocation } from "react-router-dom";
import Layout from "../layout/Layout";
import { ToastContainer } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../context/ContextProvider";
import { logout } from "../static/service";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  Font,
  PDFDownloadLink,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
function CVDetail() {
  Font.register({
    family: "Roboto",
    fonts: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-thin-webfont.ttf",
        fontWeight: "400",
      },
    ],
  });

  const location = useLocation();
  const { TOKEN } = useStateContext();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/v1/Anket/getAnket/${location.state.anketId}`,
        {
          headers: {
            Authorization: TOKEN,
          },
        }
      )
      .then((res) => {
        if (res.data.errorCode == "Unauthorized") {
          logout();
        } else {
          setData(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      // backgroundColor: "#F1F1F1",
      justifyContent: "space-between",
      padding: "0 20px",
    },
    page2: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    familyMember: {
      flexDirection: "col",
      // backgroundColor: "#D1EBF4",
      backgroundColor: "#F1F1F1",
      justifyContent: "space-between",
      padding: "5px 20px",
      marginBottom: "5px",
    },
    section: {
      padding: 25,
      fontSize: 8,
      fontFamily: "Roboto",
    },
  });
  const text = StyleSheet.create({
    xl: {
      fontSize: 10,
    },
    lg: {
      fontSize: 10,
    },
  });
  const PdfDocument = () => (
    <Document>
      <Page style={styles.section}>
        <View
          style={{
            padding: "5px 15px",
          }}
        ></View>
        <View>
          <Text style={text.xl}>1: Товч танилцуулга</Text>
          <Text>Сонирхож буй ажлын нэр: {data.requestJobId}</Text>
        </View>
        <View
          style={{
            padding: 3,
          }}
        ></View>
        <View style={styles.page}>
          <Text>Эцэг эхийн нэр: {data.lastName}</Text>
          <View
            style={{
              width: "50%",
            }}
          >
            <Text>Өөрийн нэр: {data.firstName}</Text>
          </View>
        </View>
        <View style={styles.page}>
          <Text>Email: {data.email}</Text>
          <View
            style={{
              width: "50%",
            }}
          >
            <Text>Яс үндэс: {data.originName}</Text>
          </View>
        </View>
        <View style={styles.page}>
          <Text>Нас: {data.age}</Text>
          <View
            style={{
              width: "50%",
            }}
          >
            <Text>Хүйс: {data.sex}</Text>
          </View>
        </View>

        <View style={styles.page}>
          <Text>Төрсөн он сар: {data.birthDate}</Text>
          <View
            style={{
              width: "50%",
            }}
          >
            <Text>Төрсөн аймаг, Хот: {data.birthPlace}</Text>
          </View>
        </View>
        {/* Add more Text components for other properties */}
        <View
          style={{
            padding: "5px 15px",
          }}
        ></View>

        <View
          style={{
            padding: 3,
          }}
        ></View>
        <View style={styles.page}>
          <Text>Регистрийн дугаар: {data.registerNo}</Text>
          <View
            style={{
              width: "50%",
            }}
          >
            <Text>Цусны бүлэг: {data.bloodTypes}</Text>
          </View>
        </View>
        <View style={styles.page}>
          <Text>Харилцах утас/Гэр/: {data.homePhoneNo}</Text>
          <View
            style={{
              width: "50%",
            }}
          >
            <Text>Харилцах утас/Гар/: {data.phoneNo}</Text>
          </View>
        </View>
        <View style={styles.page}>
          <Text>Жолооны үнэмлэхтэй эсэх: {data.hasDriverLicense}</Text>
          <View
            style={{
              width: "50%",
            }}
          >
            <Text>Жолооны ангилал: {data.driverLicenseClasses}</Text>
          </View>
        </View>

        <View style={styles.page}>
          <Text>Эмийн харшилтай эсэх: {data.hasPillSideEffect}</Text>
          <View
            style={{
              width: "50%",
            }}
          >
            <Text>Тийм бол ямар эм: {data.pillSideEffectDescription}</Text>
          </View>
        </View>
        <View style={styles.page}>
          <Text>Ял шийтгэлтэй эсэх: {data.hasPillSideEffect}</Text>
          <View
            style={{
              width: "50%",
            }}
          >
            <Text>Тийм бол яагаад: {data.pillSideEffectDescription}</Text>
          </View>
        </View>
        <View style={styles.page}>
          <Text>Оршин суугаа хаяг: {data.livingAddress}</Text>
          <View
            style={{
              width: "50%",
            }}
          >
            <Text>Тийм бол яагаад: {data.pillSideEffectDescription}</Text>
          </View>
        </View>
        {/* SECTION 2 */}
        <View
          style={{
            padding: "5px 15px",
          }}
        ></View>
        <View>
          <Text style={text.xl}>2: Гэр бүлийн байдал</Text>
          <Text>Гэрлэсэн эсэх: {data.familyStatus}</Text>
        </View>
        {data?.familyMembers?.map((item, index) => {
          return (
            <View key={index} style={styles.familyMember}>
              <View style={styles.page2}>
                <Text>Таны юу болох: {item.memberType}</Text>
                <View
                  style={{
                    width: "50%",
                  }}
                >
                  <Text>Овог нэр: {item.memberName}</Text>
                </View>
              </View>
              <View style={styles.page2}>
                <Text>Төрсөн он: {item.memberBirthYear}</Text>
                <View
                  style={{
                    width: "50%",
                  }}
                >
                  <Text>Мэргэжил: {item.memberOccupation}</Text>
                </View>
              </View>
              <View style={styles.page2}>
                <Text>
                  Одоо ажиллаж байгаа байгууллагын нэр: {item.memberCompanyName}
                </Text>
                <View
                  style={{
                    width: "50%",
                  }}
                >
                  <Text>
                    Одоо эрхэлж буй ажил, албан тушаал: {item.memberJobName}
                  </Text>
                </View>
              </View>
              <View style={styles.page2}>
                <Text>Утас: {item.memberPhoneNo}</Text>
              </View>
            </View>
          );
        })}
        <View>
          <Text style={text.xl}>3: Боловсрол</Text>
          {/* <Text>Гэрлэсэн эсэх: {data.familyStatus}</Text> */}
        </View>
        {data?.educations?.map((item, index) => {
          return (
            <View key={index} style={styles.familyMember}>
              <View style={styles.page2}>
                <Text>Хаана ямар сургууль: {item.instituteName}</Text>
                <View
                  style={{
                    width: "50%",
                  }}
                >
                  <Text>Эзэмшсэн мэргэжил: {item.studiedFieldName}</Text>
                </View>
              </View>
              <View style={styles.page2}>
                <Text>Элссэн огноо: {item.educationStartDate}</Text>
                <View
                  style={{
                    width: "50%",
                  }}
                >
                  <Text>Төгссөн огноо: {item.educationEndDate}</Text>
                </View>
              </View>
              <View style={styles.page2}>
                <Text>Боловсрол: {item.educationType}</Text>
                <View
                  style={{
                    width: "50%",
                  }}
                >
                  <Text>Цол зэрэг: {item.educationBadge}</Text>
                </View>
              </View>
              <View style={styles.page2}>
                <Text>Дүнгийн голч: {item.educationScore}</Text>
              </View>
            </View>
          );
        })}
        <View>
          <Text style={text.xl}>4: Сургалтанд хамрагдсан байдал</Text>
          {/* <Text>Гэрлэсэн эсэх: {data.familyStatus}</Text> */}
        </View>
        {data?.trainings?.map((item, index) => {
          return (
            <View key={index} style={styles.familyMember}>
              <View style={styles.page2}>
                <Text>Ямар чиглэл, сэдвээр: {item.trainingFieldName}</Text>
                <View
                  style={{
                    width: "50%",
                  }}
                >
                  <Text>
                    Хаана ямар байгууллагад: {item.trainingInstituteName}
                  </Text>
                </View>
              </View>
              <View style={styles.page2}>
                <Text>Хэзээ: {item.trainingYear}</Text>
                <View
                  style={{
                    width: "50%",
                  }}
                >
                  <Text>Ямар хугацаагаар: {item.trainingDuration}</Text>
                </View>
              </View>
              <View style={styles.page2}>
                <Text>
                  Сертификат, Гэрчилгээний дугаар: {item.trainingCertificateNo}
                </Text>
                <View
                  style={{
                    width: "50%",
                  }}
                >
                  <Text>Үнэлгээ: {item.trainingScore}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </Page>
      <Page style={styles.section}>
        <View
          style={{
            padding: "5px 15px",
          }}
        ></View>
        <View>
          <Text style={text.xl}>5: Гадаад хэлний мэдлэгийн түвшин</Text>
        </View>
        {data?.languages?.map((item, index) => {
          return (
            <View key={index} style={styles.familyMember}>
              <View style={styles.page2}>
                <Text>Гадаад хэлний нэр: {item.languageName}</Text>
                <View
                  style={{
                    width: "50%",
                  }}
                >
                  <Text>Ярьсныг ойлгох чадвар: {item.listeningSkillScore}</Text>
                </View>
              </View>
              <View style={styles.page2}>
                <Text>Өөрөө ярих чадвар: {item.speakingSkillScore}</Text>
                <View
                  style={{
                    width: "50%",
                  }}
                >
                  <Text>Уншиж ойлгох: {item.readingSkillScore}</Text>
                </View>
              </View>
              <View style={styles.page2}>
                <Text>Бичиж орчуулах: {item.writingSkillScore}</Text>
                {item.toeflScore != "" && (
                  <View
                    style={{
                      width: "50%",
                    }}
                  >
                    <Text>TOEFL: {item.toeflScore}</Text>
                  </View>
                )}
              </View>
              {item.ieltsScore != "" && (
                <View style={styles.page2}>
                  <Text>IELTS: {item.ieltsScore}</Text>
                </View>
              )}
            </View>
          );
        })}
        <View>
          <Text style={text.xl}>6: Таны компьютерийн мэдлэг</Text>
        </View>
        {data?.computerSkills?.map((item, index) => {
          return (
            <View key={index} style={styles.familyMember}>
              <View style={styles.page2}>
                <Text> {item.skillName}</Text>
                <View
                  style={{
                    width: "50%",
                  }}
                >
                  <Text>{item.skillScore}</Text>
                </View>
              </View>
            </View>
          );
        })}
        <View>
          <Text style={text.xl}>7: Таны ажлын туршлага</Text>
        </View>
        {data?.workExpierences?.map((item, index) => {
          return (
            <View key={index} style={styles.familyMember}>
              <View style={styles.page2}>
                <Text>Байгууллагын нэр: {item.companyName}</Text>
                <View
                  style={{
                    width: "50%",
                  }}
                >
                  <Text>Эрхэлж байсан албан тушаал: {item.workOccupation}</Text>
                </View>
              </View>
              <View style={styles.page2}>
                <Text>
                  Чиг үүрэг /Хийж байсан ажиллууд/: {item.workDescription}
                </Text>
                <View
                  style={{
                    width: "50%",
                  }}
                >
                  <Text>Ажилд орсон хугацаа: {item.workStartDate}</Text>
                </View>
              </View>
              <View style={styles.page2}>
                <Text>Ажлаас гарсан хугацаа: {item.workEndDate}</Text>
                <View
                  style={{
                    width: "50%",
                  }}
                >
                  <Text>Цалин: {item.salary}</Text>
                </View>
              </View>
              <View style={styles.page2}>
                <Text>Ажлаас гарсан шалтгаан: {item.jobQuitReason}</Text>
              </View>
            </View>
          );
        })}
        <View>
          <Text style={text.xl}>
            {" "}
            8. Таны ажил мэргэжил, туршлага, ур чадварын тодорхойлолт
          </Text>
        </View>
        {data?.definePeople?.map((item, index) => {
          return (
            <View key={index} style={styles.familyMember}>
              <View style={styles.page2}>
                <Text>Тодорхойлолт гаргах хүний нэр: {item.personName}</Text>
                <View
                  style={{
                    width: "50%",
                  }}
                >
                  <Text>
                    {" "}
                    Ажиллаж буй байгууллагын нэр: {item.personCompanyName}
                  </Text>
                </View>
              </View>
              <View style={styles.page2}>
                <Text>Албан тушаал: {item.personOccupation}</Text>
                <View
                  style={{
                    width: "50%",
                  }}
                >
                  <Text>Утасны дугаар: {item.personPhoneNo}</Text>
                </View>
              </View>
              <View style={styles.page2}>
                <Text>
                  Таныг хэдэн жилийн өмнөөс мэдэх: {item.personKnownYearCount}
                </Text>
              </View>
            </View>
          );
        })}
      </Page>
      <Page style={styles.section}>
        <View
          style={{
            padding: "5px 15px",
          }}
        ></View>
        <View>
          <Text style={text.xl}>9: Таны хувь хүний онцлогууд</Text>
        </View>
        {data?.personalSkills?.map((item, index) => {
          return (
            <View key={index} style={styles.familyMember}>
              <View style={styles.page2}>
                <Text>{item.prosConsType == 0 ? "Давуу тал" : "Сул тал"}</Text>
                <View
                  style={{
                    width: "50%",
                  }}
                >
                  <Text> </Text>
                </View>
              </View>

              <View style={styles.page2}>
                <Text>{item.prosCons}</Text>
              </View>
            </View>
          );
        })}
        <View
          style={{
            padding: "5px 15px",
          }}
        ></View>
        <View>
          <Text style={text.xl}>10: Таны эзэмшсэн ур чадварууд </Text>
        </View>
        {data?.personalSkillSummaries?.map((item, index) => {
          return (
            <View key={index} style={styles.familyMember}>
              <View style={styles.page2}>
                <Text>{item.skillName}</Text>
                <View
                  style={{
                    width: "50%",
                  }}
                >
                  <Text>{item.skillScore}</Text>
                </View>
              </View>
            </View>
          );
        })}
        <View>
          <Text style={text.xl}>11. Таны урлаг спортын авьяас</Text>
        </View>
        {data?.talents?.map((item, index) => {
          return (
            <View key={index} style={styles.familyMember}>
              <View style={styles.page2}>
                <Text>Төрөл: {item.talentBadge}</Text>
                <View
                  style={{
                    width: "50%",
                  }}
                >
                  <Text>Хичээллэсэн жил: {item.talentDuration}</Text>
                </View>
              </View>
              <View style={styles.page2}>
                <Text>Зэрэг цол: {item.talentName}</Text>
                <View
                  style={{
                    width: "50%",
                  }}
                >
                  <Text>Шагнал: {item.talentPrize}</Text>
                </View>
              </View>
              <View style={styles.page2}>
                <Text>Шагнагдсан он: {item.talentPrizeYear}</Text>
              </View>
            </View>
          );
        })}
        <View>
          <Text style={text.xl}>12. Нэмэлт танилцуулга</Text>
        </View>
        <View style={styles.page}>
          <Text>{data.personalDescription}</Text>
        </View>
        <View style={styles.page}>
          <Text>Таны ойрын 5н жилийн зорилго:</Text>
          <View
            style={{
              width: "50%",
            }}
          >
            <Text>{data.personalGoal}</Text>
          </View>
        </View>
        <View style={styles.page}>
          <Text>
            Үндсэн мэргэжлээсээ гадна өөр ямар чиглэлийн ажил хийх сонирхолтой
            вэ ?
          </Text>
        </View>
        <View style={styles.page}>
          <View
            style={{
              width: "50%",
            }}
          >
            <Text>{data.otherJobField}</Text>
          </View>
        </View>
        <View style={styles.page}>
          <Text>
            Таны ажилд орох боломжит хугацаа: {data.possibleJobStartDate}
          </Text>
        </View>

        <View style={styles.page}>
          <Text>
            Таны хүсч буй цалингын хэмжээ /Дээд/: {data.salaryMaxAmount}
          </Text>
        </View>
        <View style={styles.page}>
          <Text>
            Таны хүсч буй цалингын хэмжээ /Доод/: {data.salaryMinAmount}
          </Text>
        </View>
        <View style={styles.page}>
          <Text>
            Ажлын байрны талаарх мэдээллийг ямар эх сурвалжаас авсан бэ ?{" "}
            {data.jobInformationSource}
          </Text>
        </View>
        <View style={styles.page}>
          <Text>
            Худалдаа хөгжлийн банкны өөрийн эзэмшдэг дансны дугаар:
            {data.tdbAccount}
          </Text>
        </View>
        <View style={styles.page}>
          <Text>
            Цаг хэр баримталдаг вэ ? Цаг баримтлах талаарх таны бодол:
            {data.timeManagement}
          </Text>
        </View>
        <View
          style={{
            padding: "5px 15px",
          }}
        ></View>
        <View
          style={{
            padding: "5px 15px",
          }}
        ></View>
        <View style={styles.page}>
          <Text>
            Анкет бөглөсөн огноо:
            {data.createdDate}
          </Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <Layout>
      <div className="about-us !px-0 !mx-0">
        <ToastContainer />

        <PDFViewer
          width="100%"
          style={{
            height: "calc(100vh - 82px)",
          }}
        >
          <PdfDocument />
        </PDFViewer>

        {/* <div className="container">
            <div className="heading text-start">
              <p className="mx-0 mt-0 mb-2">1. Товч танилцуулга.</p>
            </div>
            <div className="row">
              <div className="col-md-6">
                <form className="mt-4 md:!mt-0">
                  <div className="row">
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={`Яс үндэс : ${data.originName}`}
                        disabled
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="number"
                        className="form-control"
                        placeholder={`Нас : ${data.age}`}
                        disabled
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="number"
                        className="form-control"
                        placeholder={`Хүйс : ${data.sex}`}
                        disabled
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="number"
                        className="form-control"
                        placeholder={`Цусны бүлэг : ${data.bloodTypes}`}
                        disabled
                      />
                    </div>
                    <div className="col-sm-12 ">
                      <div
                        className="form-control flex items-center justify-between"
                        action=""
                      >
                        <label htmlFor="" className="text-gray-500 nunito-400">
                          Төрсөн өдөр :
                        </label>
                        <input
                          className=" mt-2 bg-transparent text-gray-500 select-none text-[13px]"
                          type="text"
                          placeholder={`${data.birthDate}`}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group mt-2">
                    <textarea
                      className="form-control"
                      rows="4"
                      id="comment"
                      placeholder={`Төрсөн аймаг, хот: ${data.birthPlace}`}
                      disabled
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      rows="5"
                      disabled
                      id="comment"
                      placeholder={`Оршин суугаа хаяг: ${data.livingAddress}`}
                    ></textarea>
                  </div>
                </form>
              </div>

              <div className="col-md-6">
                <form className="mt-4 md:!mt-0">
                  <div className="row">
                    <div className="col-sm-12">
                      <input
                        type="text"
                        className="form-control"
                        disabled
                        placeholder={`Регистрийн дугаар: ${data.registerNo}`}
                      />
                    </div>
                    <div className="col-sm-12">
                      <input
                        type="number"
                        className="form-control"
                        placeholder={`Утасны дугаар /гар/: ${data.phoneNo}`}
                        disabled
                      />
                    </div>
                    <div className="col-sm-12">
                      <input
                        type="text"
                        className="form-control"
                        disabled
                        placeholder={`Утасны дугаар /гэр/: ${data.homePhoneNo}`}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <input
                        type="text"
                        className="form-control"
                        disabled
                        placeholder={`Эмийн харшилтай эсэх: ${data.hasPillSideEffect}`}
                      />
                    </div>
                    <div className="col-sm-12">
                      <input
                        type="text"
                        className="form-control"
                        disabled
                        placeholder={`Тийм бол ямар эм: ${data.pillSideEffectDescription}`}
                      />
                    </div>
                    <div className="col-sm-12">
                      <input
                        type="text"
                        className="form-control"
                        disabled
                        placeholder={`Ял шийтгэлтэй эсэх: ${data.hasPunishmentHistory}`}
                      />
                    </div>
                    <div className="col-sm-12">
                      <input
                        type="text"
                        className="form-control"
                        disabled
                        placeholder={`Тийм бол яагаад: ${data.punishmentWhy}`}
                      />
                    </div>
                    <div className="col-sm-12">
                      <input
                        type="text"
                        className="form-control"
                        disabled
                        placeholder={`Жолооны үнэмлэхтэй эсэх: ${data.hasDriverLicense}`}
                      />
                    </div>
                    <div className="col-sm-12">
                      <input
                        type="text"
                        className="form-control"
                        disabled
                        placeholder={`Жолооны ангилал: ${data.driverLicenseClasses}`}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div> */}
      </div>
    </Layout>
  );
}

export default CVDetail;
