import FormEmployee from "@/components/molecules/formEmpolyee";

const EmployeeCreate = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold border-b-2 w-fit border-blue-600 mb-4 leading-normal">Buat Employee</h1>
      <FormEmployee type="insert" />
    </>
  )
}

export default EmployeeCreate;