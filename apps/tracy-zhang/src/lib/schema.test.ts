import { describe, expect, it } from "vitest";

import { getPersonSchema } from "./schema";

describe("personal advisor structured data", () => {
  it("links ProfilePage to Tracy Zhang as the main entity", () => {
    const schema = getPersonSchema();
    const graph = schema["@graph"];
    const profilePage = graph.find((node) => node["@type"] === "ProfilePage");
    const person = graph.find((node) => node["@type"] === "Person");

    expect(profilePage).toBeDefined();
    expect(person).toBeDefined();
    expect(profilePage?.mainEntity).toEqual({ "@id": person?.["@id"] });
    expect(profilePage?.about).toEqual({ "@id": person?.["@id"] });
  });
});
