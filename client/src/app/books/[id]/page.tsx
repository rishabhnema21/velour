const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  return (
    <div className="h-screen w-screen">
      <p className="text-white">id : {id}</p>
    </div>
  );
};

export default page;
