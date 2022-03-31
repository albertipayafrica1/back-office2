// import { Button, Card, CardContent, Grid } from "@mui/material";
// import { Form, Formik } from "formik";
// import { array, object, string } from "yup";
// import FileUploadField from "../../components/DocumentUploadWithProgress";
// import TrialFormikForm from "../../components/KycForm/RegisteredBusinessFlow/TrialFormikForm";

// export default function Home() {
//   return (
//     <Card>
//       <CardContent>
//         <Formik
//           initialValues={{ files: [] }}
//           validationSchema={object({
//             files: array(
//               object({
//                 url: string().required(),
//               })
//             ),
//           })}
//           onSubmit={(values) => {
//             console.log("values", values);
//             return new Promise((res) => setTimeout(res, 2000));
//           }}
//         >
//           {({ values, errors, isValid, isSubmitting }) => {
//             {
//               console.log(errors, "errors");
//             }
//             return (
//               <Form>
//                 <Grid container spacing={2} direction="column">
//                   <FileUploadField name="files" />
//                   <FileUploadField name="files1" />
//                   <Grid item>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       disabled={!isValid || isSubmitting}
//                       type="submit"
//                     >
//                       Submit
//                     </Button>
//                   </Grid>
//                 </Grid>

//                 <pre style={{ color: "black" }}>
//                   {JSON.stringify({ values, errors }, null, 4)}
//                 </pre>
//               </Form>
//             );
//           }}
//         </Formik>
//       </CardContent>
//     </Card>
//   );
// }
