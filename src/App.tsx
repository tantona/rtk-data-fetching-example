import { Field, Form, Formik, useFormikContext } from "formik";
import "./App.css";
import { useGetAllTheDataQuery } from "./api";

type FormData = {
  parent: string;
};

const Display = () => {
  const { values } = useFormikContext<FormData>();
  const { data, isLoading, isFetching } = useGetAllTheDataQuery(values.parent);

  return (
    <>
      <div>Component 1</div>
      {isLoading || isFetching ? (
        <div>Loading</div>
      ) : (
        <pre style={{ fontSize: 20 }}>{JSON.stringify(data, null, 2)}</pre>
      )}
    </>
  );
};

const SomeOtherComponent = () => {
  const { values } = useFormikContext<FormData>();
  const { data, isLoading, isFetching } = useGetAllTheDataQuery(values.parent);

  return (
    <>
      <div>Component 2</div>
      {isLoading || isFetching ? (
        <div>Loading</div>
      ) : (
        <>
          <div style={{ fontSize: 20 }}>ID: {data?.id}</div>
          <div style={{ fontSize: 20 }}>Name: {data?.name}</div>
          <div style={{ fontSize: 20 }}>Children1: {JSON.stringify(data?.children1)}</div>
          <div style={{ fontSize: 20 }}>Children2: {JSON.stringify(data?.children2)}</div>
        </>
      )}
    </>
  );
};

function App() {
  return (
    <Formik<FormData>
      initialValues={{
        parent: "",
      }}
      onSubmit={() => {
        // intentional
      }}
    >
      <Form>
        <Field component="select" id="parent" name="parent">
          <option value="">--</option>
          <option value="foo">foo</option>
          <option value="bar">bar</option>
        </Field>

        <div style={{ display: "flex", width: "100%" }}>
          <div style={{ width: "50%" }}>
            <Display />
          </div>
          <div style={{ width: "50%" }}>
            <SomeOtherComponent />
          </div>
        </div>
      </Form>
    </Formik>
  );
}

export default App;
