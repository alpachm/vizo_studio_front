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
        x: direction > 0 ? 40 : -40,
    }),
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.35,
            ease: EASE_CUBIC,
        },
    },
    exit: (direction: number) => ({
        opacity: 0,
        x: direction > 0 ? -40 : 40,
        transition: {
            duration: 0.25,
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

function Step2({ onBack, onComplete, initialAnswers }: IContactStep2Props) {
    const { t } = useTranslation();

    const [[questionIndex, direction], setQuestionState] = useState<[number, number]>([0, 0]);

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
    }, [register]);

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

    const inputBaseClasses =
        "bg-transparent border-b border-text/30 focus:border-primary focus:outline-none rounded-none py-3 px-1 transition-colors w-full text-text placeholder:text-text/40 font-body text-base";

    const errorTextClasses = "text-red-400 text-sm mt-2 font-body";
    const renderOptions = (
        options: IContactQuestionnaireOption[],
        selected: string,
        stack: boolean,
        field: "stage" | "timeline" | "budget",
    ) => (
        <div className={stack ? "flex flex-col gap-3 w-full" : "flex flex-wrap gap-3 sm:gap-4 w-full"}>
            {options.map((option) => {
                const isActive = selected === option.labelKey;

                return (
                    <button
                        key={option.id}
                        type="button"
                        onClick={() => selectOption(field, option.labelKey)}
                        className={`font-body text-base sm:text-lg font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-none transition-all duration-200 cursor-pointer border ${
                            stack ? "w-full text-left" : ""
                        } ${
                            isActive
                                ? "bg-primary border-primary text-white shadow-lg scale-[1.02]"
                                : "bg-transparent border-text/20 text-text hover:border-primary"
                        }`}
                    >
                        {t(option.labelKey)}
                    </button>
                );
            })}
        </div>
    );

    return (
        <div className="w-full h-auto min-h-dvh flex flex-col bg-bg px-4 py-12 sm:px-8 md:px-16 lg:px-24">
            {/* Back to the previous step */}
            {onBack && (
                <button
                    type="button"
                    onClick={onBack}
                    className="flex items-center gap-2 text-text/60 hover:text-text transition-colors mb-8 self-start font-body text-sm cursor-pointer"
                >
                    <FiArrowLeft className="text-lg" />
                    {t("HomeScreen.Contact.step2.back")}
                </button>
            )}

            {/* Title */}
            <h2 className="font-title text-2xl sm:text-4xl lg:text-5xl font-bold text-text mb-4">
                {t("HomeScreen.Contact.step2.title")}
            </h2>

            {/* Progress indicator */}
            <p className="font-body text-sm text-text/50 mb-10">
                {t("HomeScreen.Contact.step2.progress", {
                    current: questionIndex + 1,
                    total: QUESTION_FIELDS.length,
                })}
            </p>

            <div className="w-full max-w-2xl flex flex-col">
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
                                className="font-title text-xl sm:text-2xl font-bold text-text mb-6 block"
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
                            <p className="font-title text-xl sm:text-2xl font-bold text-text mb-6">
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
                            <p className="font-title text-xl sm:text-2xl font-bold text-text mb-6">
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
                            <p className="font-title text-xl sm:text-2xl font-bold text-text mb-6">
                                {t("HomeScreen.Contact.step2.budget.subtitle")}
                            </p>
                            {renderOptions(BUDGET_OPTIONS, budget, false, "budget")}
                            {errors.budget && (
                                <span className={errorTextClasses}>{errors.budget.message}</span>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation controls */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-10">
                    {questionIndex > 0 && (
                        <button
                            type="button"
                            onClick={handlePrevious}
                            className="self-start flex items-center justify-center gap-2 bg-transparent border border-text/20 text-text font-body text-lg sm:text-xl font-semibold px-10 py-4 sm:px-12 sm:py-5 rounded-none hover:border-text/50 active:scale-95 transition-all duration-200 cursor-pointer"
                        >
                            <FiArrowLeft className="text-lg" />
                            {t("HomeScreen.Contact.step2.previous")}
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => void handleNext()}
                        className="self-start bg-primary text-white font-body text-lg sm:text-xl font-bold px-10 py-4 sm:px-12 sm:py-5 rounded-none shadow-lg hover:brightness-110 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                    >
                        {questionIndex === LAST_QUESTION_INDEX
                            ? t("HomeScreen.Contact.step2.complete")
                            : t("HomeScreen.Contact.step2.next")}
                        {questionIndex !== LAST_QUESTION_INDEX && <FiArrowRight className="text-lg" />}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Step2;
