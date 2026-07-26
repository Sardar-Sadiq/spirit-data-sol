import { useState } from "react";
import { motion } from "framer-motion";
import { Code, Cpu, Terminal, ShieldCheck, Sparkles } from "lucide-react";

const PATHS = [
    { d: "M 0 0 L 0 342", transform: "translate(370 0)" },
    {
        d: "M 164 0 L 98.814 0 L 0 83.557 L 0 232",
        transform: "translate(400 110)",
    },
    {
        d: "M 0 0 L 56.317 0 C 93.572 34.834 114.632 53.417 155 84.826 L 155 232",
        transform: "translate(181.152 110)",
    },
    { d: "M 0 0 L 295 0 L 295 121", transform: "translate(0 221)" },
    { d: "M 296 0 L 0 0 L 0 121", transform: "translate(438 221)" },
];

const SEGMENT = 0.12;
const GAP = 1 - SEGMENT;

function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

function Tag({ icon: Icon, children, className }) {
    return (
        <div
            className={cn(
                "inline-flex items-center gap-1 sm:gap-2 border border-white/20 dark:border-white/10 bg-[#171717D9] backdrop-blur-md px-2 py-1 sm:px-3.5 sm:py-2 text-center font-mono text-[9px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider text-white shadow-lg rounded-lg sm:rounded-xl transition-all duration-300 hover:border-primary-blue hover:shadow-xl max-w-[42vw] sm:max-w-none",
                className
            )}
        >
            {Icon && <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-sky-400 shrink-0" />}
            <span className="truncate sm:whitespace-nowrap">{children}</span>
        </div>
    );
}

function AnimatedLine({ d, transform }) {
    return (
        <g transform={transform}>
            {/* Static background track line */}
            <path
                d={d}
                stroke="rgba(255, 255, 255, 0.55)"
                strokeWidth={2.5}
                className="dark:stroke-white/30"
            />
            {/* Animated glowing light pulse */}
            <motion.path
                d={d}
                pathLength={1}
                stroke="#ffffff"
                strokeWidth={3}
                strokeLinecap="round"
                strokeDasharray={`${SEGMENT} ${GAP}`}
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -(SEGMENT + GAP) }}
                transition={{
                    duration: 2.5,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 0.2,
                }}
            />
        </g>
    );
}

export default function BriefServices() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !email.trim()) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        setIsSubmitting(true);
        setErrorMessage("");
        setSubmitted(false);

        try {
            const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
            if (!accessKey) {
                throw new Error("Web3Forms Access Key is missing. Please configure VITE_WEB3FORMS_ACCESS_KEY in your .env file.");
            }

            const formData = new FormData();
            formData.append("access_key", accessKey);
            formData.append("from_name", "Spirit Data Solutions (Demo Request)");
            formData.append("subject", "demo request from the website");
            formData.append("replyto", email);
            formData.append("Email", email);
            formData.append("Message", `this email person (${email}) is contacting for demo purpose pls reached out`);

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (data.success) {
                setSubmitted(true);
                setEmail("");
            } else {
                throw new Error(data.message || "Failed to submit demo request.");
            }
        } catch (error) {
            setErrorMessage(error.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.section
            id="services"
            className="relative isolate w-full overflow-hidden min-h-screen flex flex-col justify-between pt-10 pb-20 sm:pt-16 sm:pb-32"
            style={{ background: "var(--bg)", transition: "background 0.4s ease" }}
            initial={{ opacity: 0, filter: "blur(12px)", y: 24 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
                duration: 1.0,
                ease: [0.16, 1, 0.3, 1],
            }}
        >
            {/* Landscape Background Image & Fading Masks */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/bg-services.png"
                    alt=""
                    aria-hidden
                    className="md:h-[80%] h-[83%] w-full object-cover object-bottom transition-opacity duration-500 opacity-90 dark:opacity-75 dark:brightness-[0.75] dark:contrast-[1.1]"
                />
                {/* Top mask fading into page background */}
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-[var(--bg)]/30 to-transparent h-2/5 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/50 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Header Content & CTA */}
            <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
                <div className="mx-auto w-fit bg-blue-100 dark:bg-blue-950/60 px-3 py-0.5 sm:px-3.5 sm:py-1 font-mono text-[10px] sm:text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 rounded-full border border-blue-200 dark:border-blue-800/50 mb-3 sm:mb-4 shadow-xs">
                    STRATEGIC ENGINEERING SERVICES
                </div>
                <h2 className="text-xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-3 sm:mb-4">
                    Converging Innovation & Technology
                </h2>
                <p className="text-xs sm:text-base md:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto mb-5 sm:mb-6 px-2">
                    From web development and enterprise microservices to automated QA and Gen-AI, we deliver end-to-end digital excellence.
                </p>

                {/* Email / Web3Forms Demo Request Form */}
                <form onSubmit={handleSubmit} className="mx-auto flex flex-col items-center w-full max-w-xs sm:max-w-lg mb-8 sm:mb-14">
                    <div className="flex w-full items-center gap-2 sm:gap-3">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email here"
                            className="w-full min-w-0 border border-white/20 dark:border-white/10 bg-[#171717D9] backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-white placeholder-neutral-400 shadow-sm focus:outline-hidden focus:ring-2 focus:ring-primary-blue rounded-lg"
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="shrink-0 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer rounded-lg disabled:opacity-60 flex items-center gap-2"
                        >
                            {isSubmitting ? "Sending..." : "Book a demo"}
                        </button>
                    </div>
                    {submitted && (
                        <p className="mt-2.5 text-xs sm:text-sm font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-3.5 py-1.5 rounded-lg backdrop-blur-xs">
                            ✓ Demo request sent! We will reach out to you shortly.
                        </p>
                    )}
                    {errorMessage && (
                        <p className="mt-2.5 text-xs sm:text-sm font-semibold text-rose-400 bg-rose-950/80 border border-rose-800/60 px-3.5 py-1.5 rounded-lg backdrop-blur-xs">
                            ⚠️ {errorMessage}
                        </p>
                    )}
                </form>
            </div>

            {/* Circuit Line Animation Stage Container */}
            <div className="relative z-10 w-full max-w-[850px] mx-auto px-2 sm:px-6 md:px-8 mt-2 sm:mt-8 pb-14 sm:pb-24">
                <div className="relative aspect-[734/405] w-full">
                    {/* SVG Circuit Lines */}
                    <svg
                        role="presentation"
                        viewBox="0 0 734 405"
                        className="absolute inset-0 h-full w-full overflow-visible"
                        fill="none"
                    >
                        {PATHS.map((path) => (
                            <AnimatedLine key={path.d} {...path} />
                        ))}
                    </svg>

                    {/* Tag 1: Top Center (370, 0) */}
                    <Tag icon={Code} className="absolute left-[50.41%] top-0 -translate-x-1/2 -translate-y-1/2 z-20">
                        Web Development
                    </Tag>

                    {/* Tag 2: Left Middle (181.152, 110) */}
                    <Tag icon={Cpu} className="absolute left-[24.68%] top-[27.16%] -translate-x-1/2 -translate-y-1/2 z-20">
                        Full Stack Java
                    </Tag>

                    {/* Tag 3: Right Middle (564, 110) */}
                    <Tag icon={Terminal} className="absolute left-[76.84%] top-[27.16%] -translate-x-1/2 -translate-y-1/2 z-20">
                        Full Stack Python
                    </Tag>

                    {/* Tag 4: Left Bottom (0, 221) — Constrained inside left boundary */}
                    <Tag icon={ShieldCheck} className="absolute left-0 top-[54.56%] -translate-y-1/2 z-20">
                        Automation & Testing
                    </Tag>

                    {/* Tag 5: Right Bottom (734, 221) — Constrained inside right boundary */}
                    <Tag icon={Sparkles} className="absolute right-0 top-[54.56%] -translate-y-1/2 z-20">
                        Gen-AI Solutions
                    </Tag>

                    {/* Destination Logo Box */}
                    <div className="absolute bottom-0 left-[50.41%] -translate-x-1/2 translate-y-1/2 size-24 sm:size-36 md:size-44 lg:size-48 rounded-md bg-[var(--bg)] p-2.5 sm:p-4 md:p-6 flex items-center justify-center z-30 group overflow-hidden border-none shadow-none transition-colors duration-300">
                        <img
                            src="/spirit-svg.png"
                            alt="Spirit Data Solutions"
                            className="max-h-full max-w-full object-contain transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                        />
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
