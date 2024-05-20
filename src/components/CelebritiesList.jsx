import { useEffect, useRef } from "react";
import { CelebrityAccordion } from "./CelebrityAccordion";
import { calcAge } from "../utility";
import { useDispatch, useSelector } from "react-redux";
import { CelebrityActions } from "../store/celebrity.slice";
export const CelebritiesList = () => {
  const dispatch = useDispatch();
  const expandedAccordionId = useSelector(
    (state) => state.celebrity.expandedAccordionId
  );
  const celebritiesData = useSelector((state) => state.celebrity.celebrityData);
  const searchText = useSelector((state) => state.celebrity.searchText);
  const error = useSelector((state) => state.celebrity.error);

  const initialData = useRef();
  const handleChange = (val, inputType) => {
    if (inputType !== "input" && !error) {
      dispatch(
        CelebrityActions.updateExpandedAccordionId(
          expandedAccordionId === val ? "" : val
        )
      );
    }
  };
  useEffect(() => {
    const path = "/celebrities.json";
    fetch(path)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const formattedData = data.map((el) => {
          return {
            ...el,
            inputType: "text",
            canEdit: calcAge(el.dob) >= 18,
            age: calcAge(el.dob),
            name: `${el.first} ${el.last}`,
            prevName: `${el.first} ${el.last}`,
            prevAge: calcAge(el.dob),
            prevGender: el.gender,
            prevCountry: el.country,
            prevDescription: el.description,
          };
        });
        initialData.current = formattedData;
        dispatch(CelebrityActions.setCelebrityData(formattedData));
      });
  }, []);
  useEffect(() => {
    if (searchText) {
      const newData = [...initialData.current];
      const filteredList = newData.filter((el) => {
        return `${el.first.toLowerCase()} ${el.last.toLowerCase()}`.includes(
          searchText.toLowerCase()
        );
      });
      dispatch(CelebrityActions.setCelebrityData(filteredList));
    } else {
      if (initialData.current) {
        dispatch(CelebrityActions.setCelebrityData(initialData.current));
      } else {
        dispatch(CelebrityActions.setCelebrityData([]));
      }
    }
  }, [searchText]);

  return (
    <div style={{ margin: "40px auto", width: "50%" }}>
      {celebritiesData.length > 0 &&
        celebritiesData.map((data) => {
          return (
            <CelebrityAccordion
              key={data.id}
              celebrityData={data}
              onOpen={handleChange}
            />
          );
        })}
    </div>
  );
};
