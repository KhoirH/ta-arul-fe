import FormEmployee from "@/components/molecules/formEmpolyee";
import { fetcherWithAuth } from "@/config/fetcher";
import { cookies } from "next/headers";

const EmployeeCreate = async (props) => {
  
  const token = cookies().get('token').value;
  
  const response = await fetcherWithAuth(token).get(`/employee/${props?.params?.id}`);
  const initialValues = response?.data?.data;
  // console.log(initialValues);
  return (
    <FormEmployee type="update" initialValues={initialValues} id={props?.params?.id} />
  )
}

export default EmployeeCreate;