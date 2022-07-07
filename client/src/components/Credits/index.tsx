import { useNavigate } from "react-router-dom";
import noImage from "../../assets/noImage.png";
import { PERSON_ROUTE, PROFILE_URL } from "../../constants";
import { Heading2, PersonPhoto } from "../../styles";
import { CreditsCastInterface, CreditsCrewInterface, PersonCreditsInterface } from "../../interfaces";

export interface CreditsProps {
  credits: PersonCreditsInterface;
}

export interface CrewGroupsInterface {
  [department: string]: CreditsCrewInterface[];
}

export default function Credits({ credits }: CreditsProps) {
  let navigate = useNavigate();

  let groupDepartments: CrewGroupsInterface = {};

  if (credits) {
    groupDepartments = [...credits.crew].reduce<CrewGroupsInterface>(
      (accumulator, currentValue) => {
        if (accumulator[currentValue.department]) {
          let tempArray = [...accumulator[currentValue.department]];
          accumulator[currentValue.department] = [...tempArray, currentValue];
        } else {
          accumulator[currentValue.department] = [currentValue];
        }
        return accumulator;
      },
      {}
    );
  }

  return (
    <div>
      <div>
        {credits ? (
          <div className="m-t-b-50">
            <Heading2 style={{ textAlign: "center" }}>Cast</Heading2>
            <div
              className="m-t-b-50"
              style={{
                display: "flex",
                gap: 20,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {credits.cast.map((person : CreditsCastInterface) => (
                <div
                  key={person.credit_id}
                  className="zoom c-pointer"
                  onClick={() => navigate(`${PERSON_ROUTE}${person.id}`)}
                >
                  <PersonPhoto
                    src={
                      person.profile_path
                        ? `${PROFILE_URL}${person.profile_path}`
                        : noImage
                    }
                  ></PersonPhoto>
                  <p>{person.name}</p>
                  <p style={{ maxWidth: 260 }}>{person.character}</p>
                </div>
              ))}{" "}
            </div>{" "}
          </div>
        ) : null}
      </div>

      {Object.keys(groupDepartments).length > 0 ? (
        <div className="m-t-b-50" style={{ textAlign: "center" }}>
          <Heading2>Technical Crew</Heading2>
          <div
            className="m-t-b-50"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            {Object.keys(groupDepartments).map((department: string) => (
              <div key={department}>
                <h5>{department}</h5>
                {groupDepartments[department].map((a: CreditsCrewInterface) => (
                  <p key={a.credit_id}>
                    <span>{a.name}</span>
                    <span>({a.job})</span>
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
