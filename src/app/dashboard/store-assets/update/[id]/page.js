import FormAsset from "@/components/molecules/formAsset";
import { fetcherWithAuth } from "@/config/fetcher";
import jsCookie from "js-cookie";
import { cookies } from "next/headers";

const UpdateStorePage = async (props, a) => {
  // console.log(jsCookie);
  const token = cookies().get('token').value;
  // cookies
  const initialValues = await fetcherWithAuth(token).get(`/assets/${props?.params?.id}`)
  return <>
    <h1 className="text-2xl font-semibold border-b-2 w-fit border-blue-600 mb-4 leading-normal">Update Asset</h1>
    <FormAsset type="update" initialValues={initialValues?.data?.data ?? {}} id={props?.params?.id} />
  </>
};

export default UpdateStorePage;