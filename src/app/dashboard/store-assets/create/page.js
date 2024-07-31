import FormAsset from "@/components/molecules/formAsset";

const CreateStorePage = () => {
  return <>
    <h1 className="text-2xl font-semibold border-b-2 w-fit border-blue-600 mb-4 leading-normal">Buat Asset</h1>
    <FormAsset type="insert" />
  </>
};

export default CreateStorePage;