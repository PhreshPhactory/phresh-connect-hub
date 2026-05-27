import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams } from "react-router-dom";
import jsPDF from "jspdf";
import phreshHeader from "@/assets/phresh-phactory-header.jpeg";

type TaskOption = {
  id: string;
  category: string;
  task: string;
  title: string;
  description: string;
  // recurring monthly upgrade premium (cents)
  monthlyAmount: number;
};

const BASE_RETAINER_CENTS = 350000; // $3,500/mo

const PREMIUM_UPGRADES: TaskOption[] = [
  {
    id: "task-1-2",
    category: "Digital Infrastructure & Volunteer Sync",
    task: "Task 1.2",
    title: "Cross-Platform Fundraiser Duplication & Omnichannel Sync — Premium Agency-Managed",
    description:
      "Phresh Phactory's systems team manually executes the full omnichannel non-profit fundraiser setup across Instagram, Facebook, LinkedIn and PayPal Giving Fund (bypasses volunteer training).",
    monthlyAmount: 25000,
  },
  {
    id: "task-1-3",
    category: "Digital Infrastructure & Volunteer Sync",
    task: "Task 1.3",
    title: "Omnichannel Product Tagging — Premium Agency-Managed",
    description:
      "Internal team takes over manual product tagging, content-calendar tracking, and cross-platform tag mapping.",
    monthlyAmount: 25000,
  },
  {
    id: "task-1-5",
    category: "Content Production & Broadcast",
    task: "Task 1.5",
    title: "Live Streaming Infrastructure — Premium Agency-Managed",
    description:
      "Phresh Phactory functions as active broadcast operations manager: technical parameters and link pinning handled dynamically from our dashboard.",
    monthlyAmount: 25000,
  },
  {
    id: "task-1-6",
    category: "Content Production & Broadcast",
    task: "Task 1.6",
    title: "AI-Assisted Content Syndication — Premium Agency-Managed",
    description:
      "Internal media team handles all video syndication editing, AI mapping, rendering, and cross-platform distribution.",
    monthlyAmount: 25000,
  },
  {
    id: "task-1-7",
    category: "Content Production & Broadcast",
    task: "Task 1.7",
    title: "Strategic Media Relations & PR — Premium Agency-Managed",
    description:
      "PR publicists handle manual pitching, journalist follow-ups, and earned media calendar coordination.",
    monthlyAmount: 25000,
  },
  {
    id: "task-1-8",
    category: "Digital Subscriptions & Monetization",
    task: "Task 1.8",
    title: "\"Citizen Scientist\" Subscription Architecture — Premium Agency-Managed",
    description:
      "Corporate team owns user technical troubleshooting, perk dashboard updates, and community administration.",
    monthlyAmount: 25000,
  },
  {
    id: "task-1-9",
    category: "Digital Subscriptions & Monetization",
    task: "Task 1.9",
    title: "Digital Youth Curriculum — Premium Agency-Managed",
    description:
      "Manual management of curriculum enrollment portals, school district clearances, and license distribution.",
    monthlyAmount: 25000,
  },
  {
    id: "task-1-11",
    category: "Institutional Partnerships & High-Ticket Representation",
    task: "Task 1.11",
    title: "Institutional Corporate Sponsorship — Premium Agency-Managed",
    description:
      "Active fielding, delivery, and negotiation of corporate sponsorship tiers with our corporate networks.",
    monthlyAmount: 25000,
  },
  {
    id: "task-1-13",
    category: "Institutional Partnerships & High-Ticket Representation",
    task: "Task 1.13",
    title: "TED Talk Acquisition — Premium Managed PR Pitching",
    description:
      "Internal publicists coordinate manual phone-line pitches and ongoing application panel reviews with editorial gates.",
    monthlyAmount: 25000,
  },
  {
    id: "task-1-14",
    category: "Institutional Partnerships & High-Ticket Representation",
    task: "Task 1.14",
    title: "Board of Director Placement — Premium Agency-Managed",
    description:
      "Active research, outreach, and placement strategy to secure Board of Director positions for Dr. Green with aligned organizations and institutions.",
    monthlyAmount: 25000,
  },
  {
    id: "task-1-15",
    category: "Institutional Partnerships & High-Ticket Representation",
    task: "Task 1.15",
    title: "Strategic Fundraising Planning — Premium Agency-Managed",
    description:
      "Comprehensive fundraising roadmap development: donor pipeline architecture, grant calendar management, and capital campaign sequencing.",
    monthlyAmount: 25000,
  },
];

const MOR_SETUP_CENTS = 1000000; // $10,000 one-time
const MOR_WEEKLY_CENTS = 100000; // $1,000/week → bill monthly at ~$4,000
const MOR_MONTHLY_CENTS = MOR_WEEKLY_CENTS * 4; // $4,000/mo flat for simplicity

const STORAGE_KEY = "drgreen-selections-v1";

const BASE_PRIORITIES: { id: string; title: string; description: string; isUpdate?: boolean }[] = [
  { id: "base-task-1-1", title: "Task 1.1 — TikTok Fundraising Campaigns (Update)", description: "Added after preliminary meeting with Tracy: build and launch fundraising campaigns natively on TikTok, including campaign setup, creative direction, and live-stream donation integration.", isUpdate: true },
  { id: "base-task-1-2-fundraisers", title: "Task 1.2 — Cross-Platform Fundraisers (Update)", description: "Added after preliminary meeting with Tracy: extend fundraisers to Facebook, Instagram, PayPal Giving Fund, and other priority platforms with unified tracking and creative.", isUpdate: true },
  { id: "base-strategic-advisory", title: "Strategic Advisory", description: "Monthly planning sessions with Kiera H., campaign architecture, system blueprints, and priority roadmapping for the Foundation." },
  { id: "base-content-script", title: "Content & Script Development", description: "Scriptwriting, broadcast outlines, talking points, and narrative strategy for social channels, live events, and institutional outreach." },
  { id: "base-on-camera", title: "On-Camera Talent", description: "Kiera H. as co-host, moderator, or featured talent for live streams, fundraisers, and media appearances on behalf of the Foundation." },
  { id: "base-digital-architecture", title: "Digital Architecture Guidance", description: "Subscription funnel design, audience segmentation strategy, and digital product setup recommendations." },
  { id: "base-volunteer-training", title: "Volunteer Training Systems", description: "Recruitment frameworks, onboarding flows, role assignments, and training modules for your volunteer workforce." },
  { id: "base-performance-review", title: "Monthly Performance Review", description: "Sprint retrospectives, metrics review, and re-prioritization for the month ahead." },
];

const formatUSD = (cents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(cents / 100);

export default function DrGreen() {
  const [searchParams] = useSearchParams();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [basePriorities, setBasePriorities] = useState<Set<string>>(new Set());
  const [morSetup, setMorSetup] = useState(false);
  const [morOps, setMorOps] = useState(false);
  const [billingMode, setBillingMode] = useState<"one-time" | "subscription">("subscription");
  const [email, setEmail] = useState("");
  const [approverName, setApproverName] = useState("");
  const [approverDate, setApproverDate] = useState("");
  const [approverPhone, setApproverPhone] = useState("");
  const [approverEmail, setApproverEmail] = useState("");
  const [approverSignature, setApproverSignature] = useState("");
  const [loading, setLoading] = useState(false);

  // Load saved
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        setSelected(new Set(s.selected || []));
        setBasePriorities(new Set(s.basePriorities || []));
        setMorSetup(!!s.morSetup);
        setMorOps(!!s.morOps);
        setBillingMode(s.billingMode || "subscription");
        setEmail(s.email || "");
        setApproverName(s.approverName || "");
        setApproverDate(s.approverDate || "");
        setApproverPhone(s.approverPhone || "");
        setApproverEmail(s.approverEmail || "");
        setApproverSignature(s.approverSignature || "");
      }
    } catch {}
  }, []);

  // Persist
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        selected: Array.from(selected),
        basePriorities: Array.from(basePriorities),
        morSetup,
        morOps,
        billingMode,
        email,
        approverName,
        approverDate,
        approverPhone,
        approverEmail,
        approverSignature,
      })
    );
  }, [selected, basePriorities, morSetup, morOps, billingMode, email, approverName, approverDate, approverPhone, approverEmail, approverSignature]);

  const toggleBasePriority = (id: string) => {
    setBasePriorities((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Payment status banner
  useEffect(() => {
    const status = searchParams.get("payment");
    if (status === "success") {
      toast.success("Payment received. Thank you, Dr. Green.");
      // Mark MoR setup as paid so it does not repeat next month
      if (morSetup) {
        setMorSetup(false);
        toast.info("One-time setup fee marked complete and removed from your matrix.");
      }
    } else if (status === "cancelled") {
      toast("Checkout cancelled. Your selections were saved.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const monthlyTotal = useMemo(() => {
    let sum = BASE_RETAINER_CENTS;
    for (const opt of PREMIUM_UPGRADES) if (selected.has(opt.id)) sum += opt.monthlyAmount;
    if (morOps) sum += MOR_MONTHLY_CENTS;
    return sum;
  }, [selected, morOps]);

  const oneTimeTotal = useMemo(() => (morSetup ? MOR_SETUP_CENTS : 0), [morSetup]);

  const grandTotalThisCheckout = billingMode === "subscription" ? monthlyTotal + oneTimeTotal : monthlyTotal + oneTimeTotal;

  const handleCheckout = async () => {
    if (!approverName.trim() || !approverSignature.trim()) {
      toast.error("Please complete the approver name and e-signature.");
      return;
    }
    if (!approverEmail || !approverEmail.includes("@")) {
      toast.error("Please enter the approver's email.");
      return;
    }
    if (!email || !email.includes("@")) {
      toast.error("Please enter the billing email.");
      return;
    }
    if (selected.size === 0 && !morSetup && !morOps) {
      // base retainer is still charged
    }

    setLoading(true);
    try {
      const priorityTitles = BASE_PRIORITIES.filter((p) => basePriorities.has(p.id)).map((p) => p.title);
      const baseDescription = priorityTitles.length > 0
        ? `This month's priorities: ${priorityTitles.join(", ")}`
        : "Kiera H. advisory, system blueprints, scriptwriting, on-camera co-hosting, training";
      const monthly_items: any[] = [
        {
          name: "Base Strategic Advisory & Talent Floor",
          description: baseDescription,
          amount: BASE_RETAINER_CENTS,
        },
        ...PREMIUM_UPGRADES.filter((o) => selected.has(o.id)).map((o) => ({
          name: `${o.task}: ${o.title}`,
          description: o.description,
          amount: o.monthlyAmount,
        })),
      ];

      if (morOps) {
        monthly_items.push({
          name: "MoR Monthly Operations (Addendum A)",
          description: "$1,000/week — customer support, web maintenance, platform subscriptions (billed monthly)",
          amount: MOR_MONTHLY_CENTS,
        });
      }

      const one_time_items: any[] = [];
      if (morSetup) {
        one_time_items.push({
          name: "MoR Upfront Setup Fee (Addendum A)",
          description: "One-time storefront build, tax/legal infrastructure, payment gateways",
          amount: MOR_SETUP_CENTS,
        });
      }

      const { data, error } = await supabase.functions.invoke("create-drgreen-checkout", {
        body: {
          mode: billingMode === "subscription" ? "subscription" : "payment",
          customer_email: email,
          monthly_items,
          one_time_items,
          origin: window.location.origin,
        },
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || "Could not start checkout");
    } finally {
      setLoading(false);
    }
  };

  const downloadReceipt = () => {
    const doc = new jsPDF({ unit: "pt", format: "letter" });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 54;
    const maxW = pageW - margin * 2;
    let y = margin;

    const ensureSpace = (needed: number) => {
      if (y + needed > pageH - margin) {
        doc.addPage();
        y = margin;
      }
    };

    // Header band
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, pageW, 90, "F");
    doc.setTextColor(212, 175, 55);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("PHRESH PHACTORY, INC.", margin, 40);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(230, 200, 120);
    doc.text("Engagement Selection Receipt", margin, 58);
    doc.text("Ora Lee Smith Cancer Research Foundation", margin, 74);
    y = 120;

    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Selection Receipt", margin, y);
    y += 8;
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(1);
    doc.line(margin, y, pageW - margin, y);
    y += 20;

    // Approver info
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Submitted by", margin, y);
    y += 14;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const info = [
      ["Name", approverName || "—"],
      ["Date", approverDate || new Date().toISOString().slice(0, 10)],
      ["Telephone", approverPhone || "—"],
      ["Email", approverEmail || "—"],
      ["Billing email", email || "—"],
      ["Billing mode", billingMode === "subscription" ? "Recurring monthly" : "One-time (this month only)"],
    ];
    info.forEach(([k, v]) => {
      doc.setTextColor(110, 110, 110);
      doc.text(`${k}:`, margin, y);
      doc.setTextColor(0, 0, 0);
      doc.text(String(v), margin + 90, y);
      y += 14;
    });
    y += 8;

    // Line items helper
    const drawSectionHeading = (label: string) => {
      ensureSpace(28);
      doc.setFillColor(245, 240, 225);
      doc.rect(margin, y - 12, maxW, 20, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(80, 60, 0);
      doc.text(label.toUpperCase(), margin + 6, y + 2);
      y += 18;
      doc.setTextColor(0, 0, 0);
    };

    const drawLine = (title: string, sub: string, amount: string) => {
      const titleLines = doc.splitTextToSize(title, maxW - 110);
      const subLines = sub ? doc.splitTextToSize(sub, maxW - 110) : [];
      const blockH = 14 * titleLines.length + (subLines.length ? 12 * subLines.length + 2 : 0) + 8;
      ensureSpace(blockH);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(titleLines, margin, y);
      doc.text(amount, pageW - margin, y, { align: "right" });
      y += 14 * titleLines.length;
      if (subLines.length) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(90, 90, 90);
        doc.text(subLines, margin, y);
        y += 12 * subLines.length;
        doc.setTextColor(0, 0, 0);
      }
      y += 6;
      doc.setDrawColor(230, 230, 230);
      doc.line(margin, y, pageW - margin, y);
      y += 8;
    };

    // Base
    drawSectionHeading("Base Strategic Advisory & Talent Floor (included)");
    drawLine(
      "Base Monthly Retainer",
      "Kiera H. advisory, scriptwriting, on-camera talent, digital architecture, volunteer training systems, monthly performance review.",
      `${formatUSD(BASE_RETAINER_CENTS)}/mo`,
    );
    const priorityList = BASE_PRIORITIES.filter((p) => basePriorities.has(p.id));
    if (priorityList.length) {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.setTextColor(80, 80, 80);
      ensureSpace(16);
      doc.text("This month's priorities (no additional charge):", margin, y);
      y += 12;
      priorityList.forEach((p) => {
        const lines = doc.splitTextToSize(`• ${p.title}`, maxW);
        ensureSpace(12 * lines.length);
        doc.text(lines, margin, y);
        y += 12 * lines.length;
      });
      doc.setTextColor(0, 0, 0);
      y += 6;
    }

    // Premium
    const premium = PREMIUM_UPGRADES.filter((o) => selected.has(o.id));
    if (premium.length) {
      drawSectionHeading("Premium Agency-Managed Add-Ons (Phresh Phactory fully leads)");
      premium.forEach((o) => {
        drawLine(`${o.task}: ${o.title}`, `${o.category} — ${o.description}`, `+${formatUSD(o.monthlyAmount)}/mo`);
      });
    }

    // MoR
    if (morSetup || morOps) {
      drawSectionHeading("Addendum A — Merchant of Record");
      if (morSetup) drawLine("Upfront Setup Fee (one-time)", "Storefront build, tax/legal infrastructure, payment gateways.", `${formatUSD(MOR_SETUP_CENTS)}`);
      if (morOps) drawLine("Monthly Operations", "$1,000/week — customer support, web maintenance, platform subscriptions.", `${formatUSD(MOR_MONTHLY_CENTS)}/mo`);
    }

    // Totals
    ensureSpace(90);
    y += 6;
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(1);
    doc.line(margin, y, pageW - margin, y);
    y += 18;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Monthly Total", margin, y);
    doc.text(`${formatUSD(monthlyTotal)}/mo`, pageW - margin, y, { align: "right" });
    y += 16;
    if (morSetup) {
      doc.text("One-Time Setup (this checkout)", margin, y);
      doc.text(`${formatUSD(MOR_SETUP_CENTS)}`, pageW - margin, y, { align: "right" });
      y += 16;
    }
    doc.setFontSize(13);
    doc.setTextColor(140, 100, 0);
    doc.text("Due This Checkout", margin, y);
    doc.text(formatUSD(grandTotalThisCheckout), pageW - margin, y, { align: "right" });
    doc.setTextColor(0, 0, 0);
    y += 24;

    // Signature
    ensureSpace(60);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(110, 110, 110);
    doc.text("Authorized by (e-signature):", margin, y);
    y += 18;
    doc.setFont("times", "italic");
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text(approverSignature || "—", margin, y);
    y += 8;
    doc.setDrawColor(150, 150, 150);
    doc.line(margin, y, margin + 260, y);
    y += 12;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(110, 110, 110);
    doc.text(
      `${approverName || "—"} • ${approverDate || new Date().toISOString().slice(0, 10)}`,
      margin,
      y,
    );

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(140, 140, 140);
    doc.text(
      "This receipt reflects selections only. It is not a paid invoice. Questions: Kiera@PhreshPhactory.co",
      margin,
      pageH - 30,
    );
    doc.text(`Generated ${new Date().toLocaleString()}`, pageW - margin, pageH - 30, { align: "right" });

    const safeName = (approverName || "OraLee").replace(/[^a-z0-9]+/gi, "_");
    doc.save(`PhreshPhactory_Receipt_${safeName}_${new Date().toISOString().slice(0, 10)}.pdf`);
    toast.success("Receipt downloaded.");
  };

  // Group by category
  const grouped = useMemo(() => {
    const map = new Map<string, TaskOption[]>();
    for (const o of PREMIUM_UPGRADES) {
      if (!map.has(o.category)) map.set(o.category, []);
      map.get(o.category)!.push(o);
    }
    return Array.from(map.entries());
  }, []);

  const PDF_URL = "/Ora_Lee_X_Phresh_Phactory_Scope_of_Work.pdf";
  return (
    <div className="dark min-h-screen bg-black text-white" style={{ ['--primary' as any]: '43 74% 49%', ['--ring' as any]: '43 74% 49%' }}>
      <Helmet>
        <title>Dr. Green Engagement Matrix | Phresh Phactory</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="description" content="Private engagement matrix for Dr. Hadiyah-Nicole Green — Ora Lee Smith Cancer Research Foundation." />
      </Helmet>

      <img
        src={phreshHeader}
        alt="Phresh Phactory, Inc. — The Intellectuals Agency"
        className="w-full object-cover"
      />

      <div className="container-custom max-w-5xl py-12 md:py-16">
        <div className="mb-10">
          <Badge variant="outline" className="mb-3 border-[hsl(43,74%,52%)] text-[hsl(43,74%,62%)]">Private • Ora Lee Smith Cancer Research Foundation</Badge>
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-white">
            Welcome, Dr. Green
          </h1>

          <div className="mt-6 p-6 rounded-xl bg-white/[0.03] border border-[hsl(43,74%,52%)]/30">
            <p className="text-base leading-relaxed text-white">
              Dear Dr. Hadiyah-Nicole Green,
            </p>
            <p className="mt-3 text-base leading-relaxed text-white/70">
              Welcome. Following our preliminary meeting with Tracy, any new items reflected below are marked as
              <span className="text-[hsl(43,74%,62%)] font-medium"> Updates</span>.
            </p>
            <p className="mt-3 text-base leading-relaxed text-white/70">
              For anything at all, reach me directly:{" "}
              <a href="mailto:Kiera@PhreshPhactory.co" className="underline underline-offset-4 text-[hsl(43,74%,62%)] font-medium">
                Kiera@PhreshPhactory.co
              </a>.
            </p>
          </div>

          {/* How to use this page */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-[hsl(43,74%,52%)]/20 bg-white/[0.02] p-4">
              <div className="text-xs uppercase tracking-widest text-[hsl(43,74%,62%)] mb-2">01. Review</div>
              <p className="text-sm text-white/70">
                The full partnership agreement lives at the top of this page. Read it inline or download it for your records.
              </p>
            </div>
            <div className="rounded-lg border border-[hsl(43,74%,52%)]/20 bg-white/[0.02] p-4">
              <div className="text-xs uppercase tracking-widest text-[hsl(43,74%,62%)] mb-2">02. Select</div>
              <p className="text-sm text-white/70">
                Check your monthly priorities in the Base section — these are included at no extra charge. Add any premium services you would like Phresh Phactory to fully manage.
              </p>
            </div>
            <div className="rounded-lg border border-[hsl(43,74%,52%)]/20 bg-white/[0.02] p-4">
              <div className="text-xs uppercase tracking-widest text-[hsl(43,74%,62%)] mb-2">03. Authorize</div>
              <p className="text-sm text-white/70">
                Choose one-time or recurring billing, enter the Foundation's email, and click to authorize. Your selections are saved automatically.
              </p>
            </div>
          </div>

          {/* Full Scope of Work PDF */}
          <div className="mt-10 rounded-xl border border-[hsl(43,74%,52%)]/40 bg-black overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-[hsl(43,74%,52%)]/30">
              <div>
                <div className="text-xs uppercase tracking-widest text-[hsl(43,74%,62%)]">Strategic Partnership Agreement</div>
                <div className="font-medium text-white">Master Scope of Work — Full Document</div>
                <p className="text-xs text-white/60 mt-1">Please review in full before authorizing this month's selections below.</p>
              </div>
              <a href={PDF_URL} download className="inline-flex items-center rounded-md bg-[hsl(43,74%,49%)] hover:bg-[hsl(43,74%,55%)] text-black font-medium px-4 py-2 text-sm transition">
                Download PDF
              </a>
            </div>
            <object data={PDF_URL} type="application/pdf" className="w-full h-[80vh] bg-black">
              <div className="p-6 text-sm text-white/70">
                Your browser cannot display the PDF inline.{" "}
                <a href={PDF_URL} className="underline text-[hsl(43,74%,62%)]" target="_blank" rel="noopener noreferrer">Open in a new tab</a>.
              </div>
            </object>
          </div>
        </div>

        {/* Base */}
        <Card className="mb-6 border-primary/40">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle>Base Strategic Advisory & Talent Floor</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Always included at the flat monthly rate. Check the items below to flag this month's priorities — no additional charge. These selections tell Kiera and the team where to focus their included hours.
                </p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-2xl font-semibold">{formatUSD(BASE_RETAINER_CENTS)}</div>
                <div className="text-xs text-muted-foreground">per month • all included</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
              This Month's Priorities (included)
            </div>
            <div className="space-y-2">
              {BASE_PRIORITIES.map((p) => {
                const isOn = basePriorities.has(p.id);
                return (
                  <div
                    key={p.id}
                    onClick={() => toggleBasePriority(p.id)}
                    className={`cursor-pointer rounded-lg border p-3 transition flex items-start gap-3 ${
                      isOn ? "border-primary bg-primary/5" : "border-border hover:border-foreground/30"
                    }`}
                  >
                    <Checkbox checked={isOn} onCheckedChange={() => toggleBasePriority(p.id)} className="mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{p.title}</div>
                      <p className="text-xs text-muted-foreground mt-1">{p.description}</p>
                    </div>
                    {p.isUpdate && (
                      <Badge className="text-[10px] shrink-0 bg-[hsl(43,74%,49%)] text-black hover:bg-[hsl(43,74%,55%)]">Update</Badge>
                    )}
                    <Badge variant="secondary" className="text-[10px] shrink-0">Included</Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Premium upgrades grouped */}
        <div className="mb-6 p-5 rounded-xl border border-border bg-muted/30">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
            Fully Managed by Phresh Phactory, Inc.
          </div>
          <p className="text-sm text-muted-foreground">
            The add-ons below are the same operational tasks listed in your Base Strategic Advisory & Talent Floor, but executed end-to-end by the Phresh Phactory, Inc. internal team. The Base retainer covers training your Ora Lee Smith Cancer Research Foundation volunteer staff to perform these tasks in-house over time. Selecting an add-on here transfers full ownership of that task to Phresh Phactory, Inc. for the month, so it gets done immediately without waiting on volunteer capacity.
          </p>
        </div>
        {grouped.map(([cat, opts]) => (
          <div key={cat} className="mb-8">
            <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-1">
              {cat} <span className="normal-case tracking-normal text-foreground/70">— Fully Led by Phresh Phactory, Inc.</span>
            </h2>
            <p className="text-xs text-muted-foreground mb-3">
              Phresh Phactory, Inc. takes full responsibility for execution. No volunteer dependency.
            </p>
            <div className="space-y-3">
              {opts.map((o) => {
                const isOn = selected.has(o.id);
                return (
                  <Card
                    key={o.id}
                    className={`cursor-pointer transition ${isOn ? "border-primary ring-1 ring-primary/30" : "hover:border-foreground/30"}`}
                    onClick={() => toggle(o.id)}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <Checkbox checked={isOn} onCheckedChange={() => toggle(o.id)} className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="text-xs text-muted-foreground">{o.task}</div>
                              <div className="font-medium">{o.title}</div>
                            </div>
                            <div className="text-right shrink-0">
                              <div className="text-lg font-semibold">+{formatUSD(o.monthlyAmount)}</div>
                              <div className="text-xs text-muted-foreground">per month</div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">{o.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}

        {/* MoR Addendum */}
        <div className="mb-8">
          <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
            Addendum A — Merchant of Record (Independent Track)
          </h2>
          <p className="text-sm text-muted-foreground mb-3">
            Separate from the monthly retainer. Authorize independently.
          </p>
          <div className="space-y-3">
            <Card className={`cursor-pointer transition ${morSetup ? "border-primary ring-1 ring-primary/30" : ""}`} onClick={() => setMorSetup(!morSetup)}>
              <CardContent className="p-5 flex items-start gap-4">
                <Checkbox checked={morSetup} onCheckedChange={() => setMorSetup(!morSetup)} className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Pricing Component 1</div>
                      <div className="font-medium">Upfront Setup Fee — One-Time</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-lg font-semibold">{formatUSD(MOR_SETUP_CENTS)}</div>
                      <div className="text-xs text-muted-foreground">one-time</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Storefront build, global tax matrix software, legal consumer contract templates, secure payment gateways, customer support blueprints.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className={`cursor-pointer transition ${morOps ? "border-primary ring-1 ring-primary/30" : ""}`} onClick={() => setMorOps(!morOps)}>
              <CardContent className="p-5 flex items-start gap-4">
                <Checkbox checked={morOps} onCheckedChange={() => setMorOps(!morOps)} className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Pricing Component 2</div>
                      <div className="font-medium">Monthly Operational Cost ($1,000 / week, billed monthly)</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-lg font-semibold">{formatUSD(MOR_MONTHLY_CENTS)}</div>
                      <div className="text-xs text-muted-foreground">per month</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Customer support, web maintenance, code optimization, e-commerce engine, tax tracking, helpdesk ticketing, AI live-chat agents.
                  </p>
                </div>
              </CardContent>
            </Card>
            <p className="text-xs text-muted-foreground">
              Pricing Component 3 (Transaction Fee 8%–20%) is assessed per sales volume directly inside the MoR dashboard and not charged at checkout here.
            </p>
          </div>
        </div>

        {/* Summary */}
        <Card className="border-2 border-primary shadow-2xl mb-12">
          <CardHeader>
            <CardTitle>Authorization & Payment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span>Base retainer</span>
                <span>{formatUSD(BASE_RETAINER_CENTS)}/mo</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Premium upgrades ({selected.size})</span>
                <span>{formatUSD(selected.size * 25000)}/mo</span>
              </div>
              {morOps && (
                <div className="flex justify-between text-sm">
                  <span>MoR monthly operations</span>
                  <span>{formatUSD(MOR_MONTHLY_CENTS)}/mo</span>
                </div>
              )}
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>Monthly total</span>
                <span>{formatUSD(monthlyTotal)}/mo</span>
              </div>
              {morSetup && (
                <div className="flex justify-between text-sm pt-2">
                  <span>One-time setup (this checkout only)</span>
                  <span>{formatUSD(MOR_SETUP_CENTS)}</span>
                </div>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium">Billing</Label>
              <RadioGroup
                value={billingMode}
                onValueChange={(v) => setBillingMode(v as any)}
                className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2"
              >
                <Label
                  htmlFor="bm-one"
                  className={`flex items-start gap-3 p-3 rounded-md border cursor-pointer ${billingMode === "one-time" ? "border-primary" : ""}`}
                >
                  <RadioGroupItem value="one-time" id="bm-one" className="mt-0.5" />
                  <div>
                    <div className="font-medium">Pay this month only</div>
                    <div className="text-xs text-muted-foreground">One-time charge. Return next month to re-prioritize.</div>
                  </div>
                </Label>
                <Label
                  htmlFor="bm-sub"
                  className={`flex items-start gap-3 p-3 rounded-md border cursor-pointer ${billingMode === "subscription" ? "border-primary" : ""}`}
                >
                  <RadioGroupItem value="subscription" id="bm-sub" className="mt-0.5" />
                  <div>
                    <div className="font-medium">Recurring monthly</div>
                    <div className="text-xs text-muted-foreground">Auto-bill every month at the monthly total above. Cancel or change anytime.</div>
                  </div>
                </Label>
              </RadioGroup>
            </div>

            <Separator />

            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                Approver Details
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Whoever is completing this request — Dr. Green, Tracy, or another team member — please confirm your details below before authorizing.
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="approverName" className="text-sm">Full name</Label>
                  <Input id="approverName" value={approverName} onChange={(e) => setApproverName(e.target.value)} placeholder="Jane Doe" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="approverDate" className="text-sm">Date</Label>
                  <Input id="approverDate" type="date" value={approverDate} onChange={(e) => setApproverDate(e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="approverPhone" className="text-sm">Telephone</Label>
                  <Input id="approverPhone" type="tel" value={approverPhone} onChange={(e) => setApproverPhone(e.target.value)} placeholder="(555) 555-5555" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="approverEmail" className="text-sm">Email</Label>
                  <Input id="approverEmail" type="email" value={approverEmail} onChange={(e) => setApproverEmail(e.target.value)} placeholder="you@oralee.org" className="mt-1" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="approverSignature" className="text-sm">E-Signature (type your full name to sign)</Label>
                  <Input
                    id="approverSignature"
                    value={approverSignature}
                    onChange={(e) => setApproverSignature(e.target.value)}
                    placeholder="Type your full name"
                    className="mt-1 font-serif italic text-lg"
                    style={{ fontFamily: '"Brush Script MT", "Lucida Handwriting", cursive' }}
                  />
                  {approverSignature && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Approved by <span className="font-medium text-foreground">{approverSignature}</span>
                      {approverDate ? ` on ${approverDate}` : ""}.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-[1fr_auto] gap-3 items-end">
              <div>
                <Label htmlFor="email" className="text-sm">Billing email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="billing@oralee.org"
                  className="mt-1"
                />
              </div>
              <Button size="lg" onClick={handleCheckout} disabled={loading} className="md:w-auto w-full">
                {loading
                  ? "Redirecting…"
                  : `Authorize ${formatUSD(grandTotalThisCheckout)}${billingMode === "subscription" ? " + recurring" : ""}`}
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between pt-1">
              <Button
                type="button"
                variant="outline"
                onClick={downloadReceipt}
                className="border-[hsl(43,74%,52%)] text-[hsl(43,74%,62%)] hover:bg-[hsl(43,74%,49%)]/10"
              >
                Download Receipt (PDF)
              </Button>
              <p className="text-xs text-muted-foreground sm:text-right">
                Selections are saved to this browser. Download a receipt anytime to share with your team before authorizing.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
