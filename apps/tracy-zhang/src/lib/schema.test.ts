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
    expect(profilePage).toMatchObject({
      "@type": "ProfilePage",
      mainEntity: { "@id": person?.["@id"] },
      about: { "@id": person?.["@id"] },
    });
  });
});
