// ---------------------------------------------------------------------------
// Step 3 — Multi-select interest options + project details form
// ---------------------------------------------------------------------------
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import type {
    ContactFormData,
    IContactInterestOption,
    IContactStep3Props,
} from "../../../interfaces/HomeScreenInterface";

/** Interest options sourced from translation keys */
const INTEREST_OPTIONS: IContactInterestOption[] = [
    { id: "website", translationKey: "HomeScreen.Contact.step3.options.website" },
    { id: "mobileApp", translationKey: "HomeScreen.Contact.step3.options.mobileApp" },
    { id: "customSoftware", translationKey: "HomeScreen.Contact.step3.options.customSoftware" },
];

function Step3({ onBack, onSubmitForm, submitError, initialBudget }: IContactStep3Props) {
    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>({
        defaultValues: {
            selectedInterests: [],
            budget: initialBudget ?? "",
            fullName: "",
            email: "",
            phone: "",
            company: "",
            projectDetails: "",
        },
    });

    const selectedInterests = watch("selectedInterests") || [];

    // Register fields that are managed programmatically (not via register() in JSX)
    useEffect(() => {
        register("selectedInterests", {
            validate: (value) =>
                (value && value.length > 0) ||
                (t("HomeScreen.Contact.step3.form.errors.selectedInterests") as string),
        });
        register("budget", {
            validate: (value) =>
                (value && value !== "") ||
                (t("HomeScreen.Contact.step3.form.errors.budget") as string),
        });
    }, [register, t]);

    const toggleInterest = (id: string) => {
        const updated = selectedInterests.includes(id)
            ? selectedInterests.filter((item) => item !== id)
            : [...selectedInterests, id];
        setValue("selectedInterests", updated, { shouldValidate: true });
    };

    const onFormSubmit = async (data: ContactFormData) => {
        await onSubmitForm?.(data);
    };

    const inputBaseClasses =
        "w-full rounded-xl border border-neutral-500/25 bg-neutral-500/[0.03] px-4 py-3 text-sm sm:text-base font-body text-text placeholder:text-text-muted/60 focus:border-primary focus:outline-none transition-colors duration-200";

    const errorTextClasses = "text-red-400 text-xs sm:text-sm mt-1.5 font-body block";

    return (
        <div className="w-full flex flex-col">
            {/* Top progress bar (completed questionnaire -> contact details) */}
            <div className="w-full mb-6">
                <div className="w-full h-1 bg-neutral-500/20 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-primary rounded-full transition-all duration-300" />
                </div>
            </div>

            {/* Title */}
            <h3 className="font-title text-xl sm:text-2xl font-bold text-text mb-5">
                {t("HomeScreen.Contact.step3.title")}
            </h3>

            {/* Main Form Containing All Sections */}
            <form
                onSubmit={handleSubmit(onFormSubmit)}
                className="w-full flex flex-col gap-5"
            >
                {/* 1. Multi-Select Interests Section */}
                <div className="w-full">
                    <p className="font-body text-sm sm:text-base font-medium text-text-muted mb-3">
                        {t("HomeScreen.Contact.step3.subtitle")}
                    </p>

                    <div className="flex flex-wrap gap-2.5">
                        {INTEREST_OPTIONS.map((option) => {
                            const isActive = selectedInterests.includes(option.id);

                            return (
                                <button
                                    key={option.id}
                                    type="button"
                                    onClick={() => toggleInterest(option.id)}
                                    className={`font-body text-xs sm:text-sm font-medium px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer border ${
                                        isActive
                                            ? "bg-primary border-primary text-white shadow-md"
                                            : "bg-neutral-500/[0.03] border-neutral-500/25 text-text hover:border-primary/60"
                                    }`}
                                >
                                    {t(option.translationKey)}
                                </button>
                            );
                        })}
                    </div>
                    {errors.selectedInterests && (
                        <span className={errorTextClasses}>{errors.selectedInterests.message}</span>
                    )}
                </div>

                {/* 2. Text Inputs — Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="flex flex-col">
                        <input
                            {...register("fullName", {
                                required: t(
                                    "HomeScreen.Contact.step3.form.errors.fullName",
                                ) as string,
                            })}
                            type="text"
                            placeholder={t("HomeScreen.Contact.step3.form.fullName")}
                            className={`${inputBaseClasses} ${
                                errors.fullName ? "border-red-400 focus:border-red-400" : ""
                            }`}
                        />
                        {errors.fullName && (
                            <span className={errorTextClasses}>{errors.fullName.message}</span>
                        )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                        <input
                            {...register("email", {
                                required: t("HomeScreen.Contact.step3.form.errors.email") as string,
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: t(
                                        "HomeScreen.Contact.step3.form.errors.email",
                                    ) as string,
                                },
                            })}
                            type="email"
                            placeholder={t("HomeScreen.Contact.step3.form.email")}
                            className={`${inputBaseClasses} ${
                                errors.email ? "border-red-400 focus:border-red-400" : ""
                            }`}
                        />
                        {errors.email && (
                            <span className={errorTextClasses}>{errors.email.message}</span>
                        )}
                    </div>
                </div>

                {/* 3. Text Inputs — Phone & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div className="flex flex-col">
                        <input
                            {...register("phone", {
                                required: t("HomeScreen.Contact.step3.form.errors.phone") as string,
                            })}
                            type="tel"
                            placeholder={t("HomeScreen.Contact.step3.form.phone")}
                            className={`${inputBaseClasses} ${
                                errors.phone ? "border-red-400 focus:border-red-400" : ""
                            }`}
                        />
                        {errors.phone && (
                            <span className={errorTextClasses}>{errors.phone.message}</span>
                        )}
                    </div>

                    {/* Company (Optional) */}
                    <div className="flex flex-col">
                        <input
                            {...register("company")}
                            type="text"
                            placeholder={t("HomeScreen.Contact.step3.form.company")}
                            className={inputBaseClasses}
                        />
                    </div>
                </div>

                {/* 4. Project Details (Auto-expanding Textarea) */}
                <div className="flex flex-col">
                    <textarea
                        {...register("projectDetails", {
                            required: t(
                                "HomeScreen.Contact.step3.form.errors.projectDetails",
                            ) as string,
                            validate: (value) => {
                                const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
                                return (
                                    wordCount >= 5 ||
                                    (t(
                                        "HomeScreen.Contact.step3.form.errors.projectDetailsMinWords",
                                    ) as string)
                                );
                            },
                        })}
                        rows={2}
                        placeholder={t("HomeScreen.Contact.step3.form.projectDetails")}
                        onInput={(e) => {
                            e.currentTarget.style.height = "auto";
                            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                        }}
                        className={`${inputBaseClasses} resize-none overflow-hidden ${
                            errors.projectDetails ? "border-red-400 focus:border-red-400" : ""
                        }`}
                    />
                    {errors.projectDetails && (
                        <span className={errorTextClasses}>{errors.projectDetails.message}</span>
                    )}
                </div>

                {/* 5. Submit Error Alert */}
                {submitError && (
                    <div className="bg-red-400/10 border border-red-400/30 text-red-400 font-body text-sm px-4 py-3 rounded-xl">
                        {submitError}
                    </div>
                )}

                {/* 6. Navigation & Submit Buttons */}
                <div className="flex items-center justify-between gap-4 pt-2">
                    {onBack && (
                        <button
                            type="button"
                            onClick={onBack}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-500/25 bg-transparent px-5 py-3 font-body text-sm sm:text-base font-medium text-text hover:border-neutral-500/50 active:scale-[0.98] transition-all duration-200 cursor-pointer"
                        >
                            <FiArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
                            {t("HomeScreen.Contact.step2.previous")}
                        </button>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="ml-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-primary px-6 py-3 font-body text-sm sm:text-base font-semibold text-white shadow-md hover:brightness-110 active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? t("Common.loading") : t("HomeScreen.Contact.step3.form.submit")}
                        {!isSubmitting && (
                            <FiArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Step3;
