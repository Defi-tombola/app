import { useQuery } from "@apollo/client";
import { GetLotteriesQuery, GetLotteriesQueryVariables } from "@/core/api/gql/lottery/get-lotteries.gql.generated";
import { GET_LOTTERIES } from "@/core/api/gql/lottery/get-lotteries.gql";
import { LotteryStatus } from "@/core/api/schema";
import LotteryTable from "@/components/lottery/Table";

function Tombolas() {
  const { loading, error, data } = useQuery<GetLotteriesQuery, GetLotteriesQueryVariables>(GET_LOTTERIES, {
    variables: { filter: { } }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const activeTombolas = data?.lotteries.filter(( { status } ) => status === LotteryStatus.Ongoing);
  const endedTombolas = data?.lotteries.filter(( { status } ) => status === LotteryStatus.Completed);

  return (
    <div>
      <h1 className="text-2xl font-bold">Active Tombolas</h1>
      <LotteryTable lotteries={activeTombolas} />

      <br/>
      <h1 className="text-2xl font-bold mt-5">Ended Tombolas</h1>
      <LotteryTable lotteries={endedTombolas} />
    </div>
  );
}

export default Tombolas;