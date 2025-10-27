import { getVisitCounts } from '@/actions/visit/get-visit-counts';

export default async function ProfileLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const visitCounts = await getVisitCounts();
  
  // Convert the data to arrays for Chart.js
  const labels = Object.keys(visitCounts);
  const data = Object.values(visitCounts);

  return (
    <>
      {/* Pass the data as props through a special div that the client component can read */}
      <div id="visit-data" data-labels={JSON.stringify(labels)} data-values={JSON.stringify(data)} />
      {children}
    </>
  );
}