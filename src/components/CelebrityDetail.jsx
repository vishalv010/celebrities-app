import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { CelebrityActions } from "../store/celebrity.slice";
export const CelebrityDetail = ({ celebrity }) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.celebrity.error);
  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
            Age
          </Typography>
          {celebrity.inputType === "text" ? (
            <Typography variant="h5" component="div">
              {celebrity.age}
            </Typography>
          ) : (
            <input
              type="number"
              style={{ padding: "10px", fontSize: "14px" }}
              value={celebrity.age}
              onChange={(event) =>
                dispatch(
                  CelebrityActions.updateAge({
                    id: celebrity.id,
                    age: event.target.value,
                  })
                )
              }
            />
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
            Gender
          </Typography>
          {celebrity.inputType === "text" ? (
            <Typography variant="h5" component="div">
              {celebrity.gender}
            </Typography>
          ) : (
            <select
              name="gender"
              value={celebrity.gender}
              onChange={(event) =>
                dispatch(
                  CelebrityActions.updateGender({
                    id: celebrity.id,
                    gender: event.target.value,
                  })
                )
              }
              style={{ padding: "10px", fontSize: "14px" }}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="ratherNotSay">Rather Not Say</option>
              <option value="transgender">Transgender</option>
              <option value="other">Other</option>
            </select>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
            Country
          </Typography>
          {celebrity.inputType === "text" ? (
            <Typography variant="h5" component="div">
              {celebrity.country}
            </Typography>
          ) : (
            <input
              type="text"
              style={{ padding: "10px", fontSize: "14px" }}
              value={celebrity.country}
              onChange={(event) =>
                dispatch(
                  CelebrityActions.updateCountry({
                    id: celebrity.id,
                    country: event.target.value,
                  })
                )
              }
            />
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginTop: "24px",
        }}
      >
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          Description
        </Typography>
        {celebrity.inputType === "text" ? (
          <Typography variant="h5" component="div">
            {celebrity.description}
          </Typography>
        ) : (
          <textarea
            name="description"
            rows="7"
            style={{ padding: "10px", fontSize: "14px" }}
            value={celebrity.description}
            onChange={(event) =>
              dispatch(
                CelebrityActions.updateDescription({
                  id: celebrity.id,
                  description: event.target.value,
                })
              )
            }
          />
        )}
      </div>
      {error && (
        <p style={{ color: "red" }}>
          Please fill all the fields to save the data
        </p>
      )}
    </>
  );
};
