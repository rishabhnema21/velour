const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  return (
    <div className="h-screen w-screen">
      <p>id : {id}</p>
    </div>
  );
};

export default page;
