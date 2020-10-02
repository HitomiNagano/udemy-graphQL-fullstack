import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Button, Card, CardBody, Table } from "reactstrap";
import { MOVIE_LIST, DELETE_MOVIE } from "../queries/queries";

const MovieList = () => {
  const { loading, error, data } = useQuery(MOVIE_LIST);
  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    refetchQueries: [{ query: MOVIE_LIST }],
    awaitRefetchQueries: true,
  });
  const handleDeleteMovie = (id) => {
    deleteMovie({ variables: { id } });
  };

  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>Error</p>;
  }

  return (
    <div>
      <Card>
        <CardBody>
          <Table>
            <thead>
              <tr>
                <th>タイトル</th>
                <th>ジャンル</th>
                <th colSpan="2">監督</th>
              </tr>
            </thead>
            <tbody>
              {data.movies.map(({ id, name, genre, director }) => (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{genre}</td>
                  <td>{director.name}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => handleDeleteMovie(id)}
                    >
                      削除
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default MovieList;
