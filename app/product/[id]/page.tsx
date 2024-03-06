export default function page({ params }: any) {
  const { id } = params;
  return <div>{id}</div>;
}
