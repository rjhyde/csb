import React, { useState } from "react";
import "./styles.css";
import { FlatfileButton, FlatfileResults } from "@flatfile/react";
import moment from "moment";

export default function App() {
  const [results, setResults] = useState<FlatfileResults>();
  return (
    <div className="App">
      <h1>Hello World</h1>
      <h2>Import some contacts for fun</h2>

      <FlatfileButton
        licenseKey="c097c2e0-8a09-11e8-8998-f5be2f80e317"
        customer={{ userId: "12345" }}
        settings={{
          type: "People",
          fields: [
            {
              label: "SSN",
              key: "ssn",
              alternates: [
                "social",
                "social security",
                "social security number"
              ],
              validators: [
                { validate: "required" },
                {
                  validate: "regex_matches",
                  regex:
                    "^(d{3}-d{2}-d{4})|(d{3}d{2}d{4})|(d{3}s{1}d{2}s{1}d{4})$",
                  regexFlags: { ignoreCase: true },
                  error: "Must contain 9 numbers"
                }
              ]
            },
            {
              label: "First Name",
              key: "first_name",
              alternates: ["first"],
              validators: [
                { validate: "required" },
                {
                  validate: "regex_matches",
                  regex: "^.{1,50}$",
                  regexFlags: { ignoreCase: true },
                  error: "50 character limit"
                }
              ]
            },
            {
              label: "Last Name",
              key: "last_name",
              alternates: ["last"],
              validators: [
                { validate: "required" },
                {
                  validate: "regex_matches",
                  regex: "^.{1,50}$",
                  regexFlags: { ignoreCase: true },
                  error: "Too long, 50 character limit"
                }
              ]
            },
            {
              label: "Middle Name",
              key: "middle_name",
              alternates: ["middle"],
              validators: [
                {
                  validate: "regex_matches",
                  regex: "^.{1,50}$",
                  regexFlags: { ignoreCase: true },
                  error: "Too long, 50 character limit"
                }
              ]
            },
            {
              label: "Date of Birth",
              key: "dob",
              validators: [{ validate: "required" }]
            },
            {
              label: "Date of Hire",
              key: "doh",
              validators: [{ validate: "required" }]
            },
            { label: "Date of Termination", key: "dot" },
            { label: "Date of Rehire", key: "dor" },
            { label: "Year to Date Hours Worked", key: "ytd_hours" },
            { label: "Pay Group", key: "pay_group" },
            { label: "Email", key: "email" },
            { label: "Phone Number", key: "phone" },
            {
              label: "Address Line 1",
              key: "address_1",
              validators: [{ validate: "required" }]
            },
            { label: "Address Line 2", key: "address_2" },
            {
              label: "City",
              key: "city",
              validators: [{ validate: "required" }]
            },
            {
              label: "State",
              key: "state",
              validators: [{ validate: "required" }]
            },
            {
              label: "Postal Code",
              key: "postal",
              validators: [
                {
                  validate: "required",
                  validate: "regex_matches",
                  regex: "^[0-9]{5}(?:-[0-9]{4})?$",
                  error: "Zip needs to be in correct format"
                }
              ]
            }
          ]
        }}
        onRecordChange={(record) => {
          const newVal = {};
          //date normalization + validation
          if (record.dob) {
            let thisDate = moment(
              record.dob.replace(/(\d+)(st|nd|rd|th)/, "$1")
            ).format("MM/DD/YYYY");
            if (thisDate !== "Invalid date") {
              newVal.dob = {
                value: moment(
                  record.dob.replace(/(\d+)(st|nd|rd|th)/, "$1")
                ).format("MM/DD/YYYY"),
                info: moment(
                  record.dob.replace(/(\d+)(st|nd|rd|th)/, "$1")
                ).isAfter(moment())
                  ? [
                      {
                        message: "Date cannot be in the future.",
                        level: "error"
                      }
                    ]
                  : []
              };
            } else {
              newVal.dob = {
                info: [
                  {
                    message:
                      "Please check that the date is formatted MM/DD/YYYY.",
                    level: "error"
                  }
                ]
              };
            }
          }
          return {
            dob: newVal.dob
          };
        }}
        onRecordInit={(record) => {
          const newVal = {};
          //date normalization + validation
          if (record.dob) {
            let thisDate = moment(
              record.dob.replace(/(\d+)(st|nd|rd|th)/, "$1")
            ).format("MM/DD/YYYY");
            if (thisDate !== "Invalid date") {
              newVal.dob = {
                value: moment(
                  record.dob.replace(/(\d+)(st|nd|rd|th)/, "$1")
                ).format("MM/DD/YYYY"),
                info: moment(
                  record.dob.replace(/(\d+)(st|nd|rd|th)/, "$1")
                ).isAfter(moment())
                  ? [
                      {
                        message: "Date cannot be in the future.",
                        level: "error"
                      }
                    ]
                  : []
              };
            } else {
              newVal.dob = {
                info: [
                  {
                    message:
                      "Please check that the date is formatted MM/DD/YYYY.",
                    level: "error"
                  }
                ]
              };
            }
          }
          return {
            dob: newVal.dob
          };
        }}
        onData={async (results) => {
          setResults(results);
          // post to your API probably too
          return "Done!";
        }}
      >
        Import Contacts
      </FlatfileButton>

      <pre style={{ padding: "20px", background: "#dadada" }}>
        {results ? (
          <ul>
            {results.data.map((record) => (
              <li>
                {record.name} &lt;{record.email}&gt;
              </li>
            ))}
          </ul>
        ) : (
          <div>no data yet</div>
        )}
      </pre>
    </div>
  );
}
