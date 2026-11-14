// ---------------------------------------------------------------------------
// Step 2 — Step-by-step project questionnaire (one question at a time)
// ---------------------------------------------------------------------------
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import type {
    IContactQuestionnaireAnswers,
    IContactQuestionnaireOption,
    IContactStep2Props,
} from "../../../interfaces/HomeScreenInterface";

/** Custom cubic-bezier easing for a natural slide feel */
const EASE_CUBIC = [0.25, 1, 0.5, 1] as const;

/** Direction-aware question transition variants */
const questionVariants = {
    initial: (direction: number) => ({
        opacity: 0,
        x: direction > 0 ? 28 : -28,
    }),
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.3,
            ease: EASE_CUBIC,
        },
    },
    exit: (direction: number) => ({
        opacity: 0,
        x: direction > 0 ? -28 : 28,
        transition: {
            duration: 0.2,
            ease: EASE_CUBIC,
        },
    }),
};

/** Answer options for the "current stage" question */
const STAGE_OPTIONS: IContactQuestionnaireOption[] = [
    { id: "idea", labelKey: "HomeScreen.Contact.step2.stage.options.idea" },
    { id: "planning", labelKey: "HomeScreen.Contact.step2.stage.options.planning" },
    { id: "developing", labelKey: "HomeScreen.Contact.step2.stage.options.developing" },
];

/** Answer options for the "time window" question */
const TIMELINE_OPTIONS: IContactQuestionnaireOption[] = [
    { id: "oneMonth", labelKey: "HomeScreen.Contact.step2.timeline.options.oneMonth" },
    { id: "twoToFourMonths", labelKey: "HomeScreen.Contact.step2.timeline.options.twoToFourMonths" },
    { id: "fivePlusMonths", labelKey: "HomeScreen.Contact.step2.timeline.options.fivePlusMonths" },
];

/** Answer options for the "investment range" question */
const BUDGET_OPTIONS: IContactQuestionnaireOption[] = [
    { id: "range1", labelKey: "HomeScreen.Contact.step2.budget.options.range1" },
    { id: "range2", labelKey: "HomeScreen.Contact.step2.budget.options.range2" },
    { id: "range3", labelKey: "HomeScreen.Contact.step2.budget.options.range3" },
    { id: "range4", labelKey: "HomeScreen.Contact.step2.budget.options.range4" },
    { id: "range5", labelKey: "HomeScreen.Contact.step2.budget.options.range5" },
];

/** Fields in display order; used for navigation and per-question validation */
const QUESTION_FIELDS: Array<keyof IContactQuestionnaireAnswers> = [
    "objective",
    "stage",
    "timeline",
    "budget",
];
const LAST_QUESTION_INDEX = QUESTION_FIELDS.length - 1;

function Step2({ onComplete, initialAnswers }: IContactStep2Props) {
    const { t } = useTranslation();

    const [[questionIndex, direction], setQuestionState] = useState<[number, number]>([
        initialAnswers ? LAST_QUESTION_INDEX : 0,
        0,
    ]);

    const {
        register,
        setValue,
        watch,
        trigger,
        formState: { errors },
    } = useForm<IContactQuestionnaireAnswers>({
        defaultValues: initialAnswers ?? {
            objective: "",
            stage: "",
            timeline: "",
            budget: "",
        },
    });

    const objective = watch("objective") ?? "";
    const stage = watch("stage") ?? "";
    const timeline = watch("timeline") ?? "";
    const budget = watch("budget") ?? "";

    // Register single-select fields that are managed programmatically.
    useEffect(() => {
        register("stage", {
            validate: (value) =>
                (value && value !== "") ||
                (t("HomeScreen.Contact.step2.stage.error") as string),
        });
        register("timeline", {
            validate: (value) =>
                (value && value !== "") ||
                (t("HomeScreen.Contact.step2.timeline.error") as string),
        });
        register("budget", {
            validate: (value) =>
                (value && value !== "") ||
                (t("HomeScreen.Contact.step2.budget.error") as string),
        });
    }, [register, t]);

    const goToQuestion = (nextIndex: number) => {
        setQuestionState([nextIndex, nextIndex > questionIndex ? 1 : -1]);
    };

    const handleNext = async () => {
        const field = QUESTION_FIELDS[questionIndex];
        if (!field) return;
        const isValid = await trigger(field);
        if (!isValid) return;

        if (questionIndex < LAST_QUESTION_INDEX) {
            goToQuestion(questionIndex + 1);
            return;
        }

        onComplete?.({ objective, stage, timeline, budget });
    };

    const handlePrevious = () => {
        if (questionIndex > 0) {
            goToQuestion(questionIndex - 1);
        }
    };

    const selectOption = (field: "stage" | "timeline" | "budget", labelKey: string) => {
        const current = field === "stage" ? stage : field === "timeline" ? timeline : budget;
        setValue(field, current === labelKey ? "" : labelKey, { shouldValidate: true });
    };

    const progressPercentage = ((questionIndex + 1) / QUESTION_FIELDS.length) * 100;

    const inputBaseClasses =
        "w-full rounded-xl border border-neutral-500/25 bg-neutral-500/[0.03] px-4 py-3.5 text-base font-body text-text placeholder:text-text-muted/60 focus:border-primary focus:outline-none transition-colors duration-200";

    const errorTextClasses = "text-red-400 text-sm mt-2 font-body block";

    const renderOptions = (
        options: IContactQuestionnaireOption[],
        selected: string,
        stack: boolean,
        field: "stage" | "timeline" | "budget",
    ) => (
        <div className={stack ? "flex flex-col gap-3 w-full" : "flex flex-wrap gap-3 w-full"}>
            {options.map((option) => {
                const isActive = selected === option.labelKey;

                return (
                    <button
                        key={option.id}
                        type="button"
                        onClick={() => selectOption(field, option.labelKey)}
                        className={`font-body text-sm sm:text-base font-medium px-4 py-3.5 rounded-xl transition-all duration-200 cursor-pointer border ${
                            stack ? "w-full text-left" : ""
                        } ${
                            isActive
                                ? "bg-primary border-primary text-white shadow-md"
                                : "bg-neutral-500/[0.03] border-neutral-500/25 text-text hover:border-primary/60"
                        }`}
                    >
                        {t(option.labelKey)}
                    </button>
                );
            })}
        </div>
    );

    return (
        <div className="w-full flex flex-col">
            {/* Top progress header & orange progress bar */}
            <div className="w-full mb-7">
                <div className="flex items-center justify-between">
                    <span className="font-body text-xs sm:text-sm font-medium text-text-muted">
                        {t("HomeScreen.Contact.step2.progress", {
                            current: questionIndex + 1,
                            total: QUESTION_FIELDS.length,
                        })}
                    </span>
                </div>
                <div className="w-full h-1 bg-neutral-500/20 rounded-full overflow-hidden mt-3">
                    <div
                        className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
            </div>

            <div className="w-full flex flex-col min-h-[11rem] justify-between">
                <AnimatePresence mode="wait" custom={direction}>
                    {/* 1. Objective — text input */}
                    {questionIndex === 0 && (
                        <motion.div
                            key="objective"
                            custom={direction}
                            variants={questionVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="w-full"
                        >
                            <label
                                htmlFor="contact-objective"
                                className="font-title text-base sm:text-lg font-semibold text-text mb-4 block"
                            >
                                {t("HomeScreen.Contact.step2.objective.label")}
                            </label>
                            <input
                                {...register("objective", {
                                    required: t("HomeScreen.Contact.step2.objective.error") as string,
                                    validate: (value) =>
                                        value.trim() !== "" ||
                                        (t("HomeScreen.Contact.step2.objective.error") as string),
                                })}
                                id="contact-objective"
                                type="text"
                                placeholder={t("HomeScreen.Contact.step2.objective.placeholder")}
                                className={`${inputBaseClasses} ${
                                    errors.objective ? "border-red-400 focus:border-red-400" : ""
                                }`}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        void handleNext();
                                    }
                                }}
                            />
                            {errors.objective && (
                                <span className={errorTextClasses}>{errors.objective.message}</span>
                            )}
                        </motion.div>
                    )}

                    {/* 2. Stage — single select */}
                    {questionIndex === 1 && (
                        <motion.div
                            key="stage"
                            custom={direction}
                            variants={questionVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="w-full"
                        >
                            <p className="font-title text-base sm:text-lg font-semibold text-text mb-4">
                                {t("HomeScreen.Contact.step2.stage.label")}
                            </p>
                            {renderOptions(STAGE_OPTIONS, stage, true, "stage")}
                            {errors.stage && (
                                <span className={errorTextClasses}>{errors.stage.message}</span>
                            )}
                        </motion.div>
                    )}

                    {/* 3. Timeline — single select */}
                    {questionIndex === 2 && (
                        <motion.div
                            key="timeline"
                            custom={direction}
                            variants={questionVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="w-full"
                        >
                            <p className="font-title text-base sm:text-lg font-semibold text-text mb-4">
                                {t("HomeScreen.Contact.step2.timeline.label")}
                            </p>
                            {renderOptions(TIMELINE_OPTIONS, timeline, false, "timeline")}
                            {errors.timeline && (
                                <span className={errorTextClasses}>{errors.timeline.message}</span>
                            )}
                        </motion.div>
                    )}

                    {/* 4. Investment range — single select */}
                    {questionIndex === 3 && (
                        <motion.div
                            key="budget"
                            custom={direction}
                            variants={questionVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="w-full"
                        >
                            <p className="font-title text-base sm:text-lg font-semibold text-text mb-4">
                                {t("HomeScreen.Contact.step2.budget.subtitle")}
                            </p>
                            {renderOptions(BUDGET_OPTIONS, budget, false, "budget")}
                            {errors.budget && (
                                <span className={errorTextClasses}>{errors.budget.message}</span>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation controls — "Anterior" only renders when questionIndex > 0 */}
                <div className="flex items-center justify-between gap-4 mt-8 pt-2">
                    {questionIndex > 0 && (
                        <button
                            type="button"
                            onClick={handlePrevious}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-500/25 bg-transparent px-5 py-3 font-body text-sm sm:text-base font-medium text-text hover:border-neutral-500/50 active:scale-[0.98] transition-all duration-200 cursor-pointer"
                        >
                            <FiArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
                            {t("HomeScreen.Contact.step2.previous")}
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => void handleNext()}
                        className="ml-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-primary px-6 py-3 font-body text-sm sm:text-base font-semibold text-white shadow-md hover:brightness-110 active:scale-[0.98] transition-all duration-200 cursor-pointer"
                    >
                        {questionIndex === LAST_QUESTION_INDEX
                            ? t("HomeScreen.Contact.step2.complete")
                            : t("HomeScreen.Contact.step2.next")}
                        <FiArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Step2;
