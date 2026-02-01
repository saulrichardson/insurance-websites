import { NextResponse } from "next/server";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const name = getString(formData, "name");
  const phone = getString(formData, "phone");
  const email = getString(formData, "email");
  const coverage = getString(formData, "coverage");
  const zip = getString(formData, "zip");
  const notes = getString(formData, "notes");
  const source = getString(formData, "source");

  if (!name || !phone) {
    return NextResponse.json(
      { ok: false, error: "Please provide your name and phone number." },
      { status: 400 },
    );
  }

  const payload = {
    receivedAt: new Date().toISOString(),
    name,
    phone,
    email,
    coverage,
    zip,
    notes,
    source,
    userAgent: request.headers.get("user-agent") ?? "",
    ip: request.headers.get("x-forwarded-for") ?? "",
  };

  // Temporary implementation: store submissions in server logs.
  // This keeps the form functional without requiring external services or API keys.
  // Next step: connect to an email provider or database once you choose one.
  console.log("[quote-request]", payload);

  return NextResponse.json({ ok: true });
}

