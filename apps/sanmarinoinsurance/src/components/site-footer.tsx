import Link from "next/link";
import { Container } from "@/components/ui/container";
import { getFullAddressLine, site } from "@/lib/site";

function HoursList() {
  return (
    <ul className="mt-3 space-y-2 text-sm text-muted">
      {site.agent.hours.map((h) => (
        <li key={h.day} className="flex items-start justify-between gap-4">
          <span className="min-w-10 text-foreground/80">{h.day}</span>
          {"note" in h ? (
            <span className="text-right">{h.note}</span>
          ) : (
            <span className="text-right">
              {h.open} – {h.close}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function SiteFooter() {
  const addressLine = getFullAddressLine();
  const year = new Date().getFullYear();

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
                <span className="text-foreground/80">Call:</span>{" "}
                <a className="hover:text-foreground" href={`tel:${site.agent.phone.e164}`}>
                  {site.agent.phone.display}
                </a>
              </div>
              <div>
                <span className="text-foreground/80">Fax:</span>{" "}
                <span>{site.agent.fax.display}</span>
              </div>
              <div>
                <span className="text-foreground/80">Address:</span>{" "}
                <a
                  className="hover:text-foreground"
                  href={site.agent.links.mapCid}
                  target="_blank"
                  rel="noreferrer"
                >
                  {addressLine}
                </a>
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-foreground">Office hours</div>
            <HoursList />
            <div className="mt-4 space-y-1 text-sm text-muted">
              {site.agent.notes.map((note) => (
                <div key={note}>{note}</div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-foreground">Explore</div>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>
                <Link className="hover:text-foreground" href="/insurance">
                  Insurance we offer
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

            <div className="mt-8 text-sm font-semibold text-foreground">
              Languages
            </div>
            <div className="mt-3 text-sm text-muted">
              {site.agent.languages.join(", ")}
            </div>
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
            <a
              className="hover:text-foreground"
              href={site.agent.links.mapCid}
              target="_blank"
              rel="noreferrer"
            >
              Directions
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
