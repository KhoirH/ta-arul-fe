import FormEmployee from "@/components/molecules/formEmpolyee";
import { fetcherWithAuth } from "@/config/fetcher";
import { cookies } from "next/headers";

const EmployeeCreate = async (props) => {
  
  const token = cookies().get('token').value;
  
  const response = await fetcherWithAuth(token).get(`/employee/${props?.params?.id}`);
  const initialValues = response?.data?.data;
  // console.log(initialValues);
  return (
    <>
      <h1 className="text-2xl font-semibold border-b-2 w-fit border-blue-600 mb-4 leading-normal">Update Employee</h1>
      <FormEmployee type="update" initialValues={initialValues} id={props?.params?.id} />
    </>
  )
}

export default EmployeeCreate;