import Link from "next/link";
import { Container } from "@/components/ui/container";
import { getFullAddressLine, getOffice, site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const sanMarino = getOffice("san-marino");
  const laPalma = getOffice("la-palma");

  return (
    <footer className="border-t border-foreground/20 bg-background">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="text-sm font-semibold text-foreground">
              {site.brand.name}
            </div>
            <div className="mt-2 text-sm text-muted">{site.brand.legalLine}</div>

            <div className="mt-6 space-y-2 text-sm text-muted">
              <div>
                <span className="text-foreground/80">Main line:</span>{" "}
                <a className="hover:text-foreground" href={`tel:${site.agent.phone.e164}`}>
                  {site.agent.phone.display}
                </a>
              </div>
              <div>
                <span className="text-foreground/80">Fax:</span>{" "}
                <span>{site.agent.fax.display}</span>
              </div>
            </div>

            <div className="mt-8 text-sm font-semibold text-foreground">
              Languages
            </div>
            <div className="mt-3 text-sm text-muted">
              {site.agent.languages.join(", ")}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-foreground">Offices</div>

            <div className="mt-5 space-y-6 text-sm text-muted">
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">
                  {sanMarino.location}
                </div>
                <div className="mt-2">{getFullAddressLine("san-marino")}</div>
                <div className="mt-2">
                  <a className="hover:text-foreground" href={`tel:${sanMarino.phone.e164}`}>
                    {sanMarino.phone.display}
                  </a>
                </div>
                <div className="mt-2 text-xs text-foreground/60">{officeHoursSummary("san-marino")}</div>
                <div className="mt-3">
                  <a className="hover:text-foreground" href={sanMarino.links.mapCid} target="_blank" rel="noreferrer">
                    Directions
                  </a>
                  <span className="mx-2 text-foreground/25">|</span>
                  <Link className="hover:text-foreground" href="/locations/san-marino">
                    Details
                  </Link>
                </div>
              </div>

              <div>
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">
                  {laPalma.location}
                </div>
                <div className="mt-2">{getFullAddressLine("la-palma")}</div>
                <div className="mt-2">
                  <a className="hover:text-foreground" href={`tel:${laPalma.phone.e164}`}>
                    {laPalma.phone.display}
                  </a>
                </div>
                <div className="mt-2 text-xs text-foreground/60">{officeHoursSummary("la-palma")}</div>
                <div className="mt-3">
                  <a className="hover:text-foreground" href={laPalma.links.mapCid} target="_blank" rel="noreferrer">
                    Directions
                  </a>
                  <span className="mx-2 text-foreground/25">|</span>
                  <Link className="hover:text-foreground" href="/locations/la-palma">
                    Details
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-1 text-sm text-muted">
              {site.agent.notes.map((note) => (
                <div key={note}>{note}</div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-foreground">Explore</div>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>
                <Link className="hover:text-foreground" href="/coverages">
                  Coverages
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground" href="/locations">
                  Locations
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground" href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground" href="/contact">
                  Office
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground" href="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground" href="/careers">
                  Careers
                </Link>
              </li>
              <li>
                <a
                  className="hover:text-foreground"
                  href={site.agent.links.allstateProfile}
                  target="_blank"
                  rel="noreferrer"
                >
                  Allstate profile & reviews
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-foreground/20 pt-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <div>
            <div>© {year} {site.brand.name}. All rights reserved.</div>
            <div className="mt-2 text-foreground/70">
              Allstate® is a registered trademark of Allstate Insurance Company.
            </div>
          </div>
          <div className="space-x-3">
            <a
              className="hover:text-foreground"
              href={site.agent.links.allstateProfile}
              target="_blank"
              rel="noreferrer"
            >
              Source: Allstate agent page
            </a>
            <span className="text-foreground/30">|</span>
            <Link className="hover:text-foreground" href="/locations">
              Locations
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function officeHoursSummary(officeId: "san-marino" | "la-palma") {
  if (officeId === "san-marino") return "Mon–Fri 9:00–6:00 • Weekends by appointment";
  return "Mon–Fri 9:00–5:45 • Weekends closed";
}
