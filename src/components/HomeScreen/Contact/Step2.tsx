// ---------------------------------------------------------------------------
// Step 2 — Multi-select interest options + project details form
// ---------------------------------------------------------------------------
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { FiArrowLeft } from "react-icons/fi";
import type {
    BudgetOption,
    ContactFormData,
    IContactInterestOption,
    IContactStep2Props,
} from "../../../interfaces/HomeScreenInterface";

/** Interest options sourced from translation keys */
const INTEREST_OPTIONS: IContactInterestOption[] = [
    { id: "website", translationKey: "HomeScreen.Contact.step2.options.website" },
    { id: "mobileApp", translationKey: "HomeScreen.Contact.step2.options.mobileApp" },
    { id: "customSoftware", translationKey: "HomeScreen.Contact.step2.options.customSoftware" },
];

/** Budget range options sourced from translation keys */
const BUDGET_OPTIONS: BudgetOption[] = [
    { id: "range1", label: "HomeScreen.Contact.step2.budget.options.range1" },
    { id: "range2", label: "HomeScreen.Contact.step2.budget.options.range2" },
    { id: "range3", label: "HomeScreen.Contact.step2.budget.options.range3" },
    { id: "range4", label: "HomeScreen.Contact.step2.budget.options.range4" },
    { id: "range5", label: "HomeScreen.Contact.step2.budget.options.range5" },
];

function Step2({ onBack, onSubmitForm, submitError }: IContactStep2Props) {
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
            budget: "",
            fullName: "",
            email: "",
            phone: "",
            company: "",
            projectDetails: "",
        },
    });

    const selectedInterests = watch("selectedInterests") || [];
    const selectedBudget = watch("budget") || "";

    // Register fields that are managed programmatically (not via register() in JSX)
    useEffect(() => {
        register("selectedInterests", {
            validate: (value) =>
                (value && value.length > 0) ||
                (t("HomeScreen.Contact.step2.form.errors.selectedInterests") as string),
        });
        register("budget", {
            validate: (value) =>
                (value && value !== "") ||
                (t("HomeScreen.Contact.step2.form.errors.budget") as string),
        });
    }, [register]);

    const toggleInterest = (id: string) => {
        const updated = selectedInterests.includes(id)
            ? selectedInterests.filter((item) => item !== id)
            : [...selectedInterests, id];
        setValue("selectedInterests", updated, { shouldValidate: true });
    };

    const handleSelectBudget = (label: string) => {
        const nextBudget = selectedBudget === label ? "" : label;
        setValue("budget", nextBudget, { shouldValidate: true });
    };

    const onFormSubmit = (data: ContactFormData) => {
        onSubmitForm?.(data);
    };

    const inputBaseClasses =
        "bg-transparent border-b border-text/30 focus:border-primary focus:outline-none rounded-none py-3 px-1 transition-colors w-full text-text placeholder:text-text/40 font-body text-base";

    const errorTextClasses = "text-red-400 text-sm mt-1 font-body";

    return (
        <div className="w-full h-auto min-h-dvh flex flex-col bg-bg px-4 py-12 sm:px-8 md:px-16 lg:px-24">
            {/* Back Button */}
            {onBack && (
                <button
                    type="button"
                    onClick={onBack}
                    className="flex items-center gap-2 text-text/60 hover:text-text transition-colors mb-8 self-start font-body text-sm cursor-pointer"
                >
                    <FiArrowLeft className="text-lg" />
                    {t("HomeScreen.Contact.step2.form.back")}
                </button>
            )}

            {/* Title */}
            <h2 className="font-title text-2xl sm:text-4xl lg:text-5xl font-bold text-text mb-8">
                {t("HomeScreen.Contact.step2.title")}
            </h2>

            {/* Main Form Containing All Sections */}
            <form
                onSubmit={handleSubmit(onFormSubmit)}
                className="w-full max-w-2xl flex flex-col gap-8"
            >
                {/* 1. Multi-Select Interests Section */}
                <div className="w-full">
                    <p className="text-xl sm:text-2xl font-thin text-text mb-4">
                        {t("HomeScreen.Contact.step2.subtitle")}
                    </p>

                    <div className="flex flex-wrap gap-4 mt-2">
                        {INTEREST_OPTIONS.map((option) => {
                            const isActive = selectedInterests.includes(option.id);

                            return (
                                <button
                                    key={option.id}
                                    type="button"
                                    onClick={() => toggleInterest(option.id)}
                                    className={`font-body text-base sm:text-lg font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-none transition-all duration-200 cursor-pointer border ${
                                        isActive
                                            ? "bg-primary border-primary text-white shadow-lg scale-[1.02]"
                                            : "bg-transparent border-text/20 text-text hover:border-text/50"
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="flex flex-col">
                        <input
                            {...register("fullName", {
                                required: t(
                                    "HomeScreen.Contact.step2.form.errors.fullName",
                                ) as string,
                            })}
                            type="text"
                            placeholder={t("HomeScreen.Contact.step2.form.fullName")}
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
                                required: t("HomeScreen.Contact.step2.form.errors.email") as string,
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: t(
                                        "HomeScreen.Contact.step2.form.errors.email",
                                    ) as string,
                                },
                            })}
                            type="email"
                            placeholder={t("HomeScreen.Contact.step2.form.email")}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div className="flex flex-col">
                        <input
                            {...register("phone", {
                                required: t("HomeScreen.Contact.step2.form.errors.phone") as string,
                            })}
                            type="tel"
                            placeholder={t("HomeScreen.Contact.step2.form.phone")}
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
                            placeholder={t("HomeScreen.Contact.step2.form.company")}
                            className={inputBaseClasses}
                        />
                    </div>
                </div>

                {/* 4. Project Details (Auto-expanding Textarea) */}
                <div className="flex flex-col">
                    <textarea
                        {...register("projectDetails", {
                            required: t(
                                "HomeScreen.Contact.step2.form.errors.projectDetails",
                            ) as string,
                            validate: (value) => {
                                const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
                                return (
                                    wordCount >= 5 ||
                                    (t(
                                        "HomeScreen.Contact.step2.form.errors.projectDetailsMinWords",
                                    ) as string)
                                );
                            },
                        })}
                        rows={1}
                        placeholder={t("HomeScreen.Contact.step2.form.projectDetails")}
                        onInput={(e) => {
                            e.currentTarget.style.height = "auto";
                            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                        }}
                        className={`bg-transparent border-b border-text/30 focus:border-primary focus:outline-none rounded-none py-3 px-1 transition-colors w-full text-text placeholder:text-text/50 text-base resize-none overflow-hidden ${
                            errors.projectDetails ? "border-red-400 focus:border-red-400" : ""
                        }`}
                    />
                    {errors.projectDetails && (
                        <span className={errorTextClasses}>{errors.projectDetails.message}</span>
                    )}
                </div>

                {/* 5. Single-Select Budget Range */}
                <div className="w-full mt-4">
                    <h3 className="font-title text-xl sm:text-2xl font-bold text-text mb-6">
                        {t("HomeScreen.Contact.step2.budget.subtitle")}
                    </h3>

                    <div className="flex flex-wrap gap-3 sm:gap-4 w-full">
                        {BUDGET_OPTIONS.map((option) => {
                            const isActive = selectedBudget === option.label;

                            return (
                                <button
                                    key={option.id}
                                    type="button"
                                    onClick={() => handleSelectBudget(option.label)}
                                    className={`font-body text-base sm:text-lg font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-none transition-all duration-200 cursor-pointer ${
                                        isActive
                                            ? "bg-primary border-primary text-white shadow-lg scale-[1.02]"
                                            : "bg-transparent border border-text/20 text-text hover:border-primary"
                                    }`}
                                >
                                    {t(option.label)}
                                </button>
                            );
                        })}
                    </div>
                    {errors.budget && (
                        <span className={errorTextClasses}>{errors.budget.message}</span>
                    )}
                </div>

                {/* 6. Submit Error Alert */}
                {submitError && (
                    <div className="bg-red-400/10 border border-red-400/30 text-red-400 font-body text-sm px-4 py-3 rounded-none mt-4">
                        {submitError}
                    </div>
                )}

                {/* 7. Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary text-white font-body text-lg sm:text-xl font-bold px-10 py-4 sm:px-12 sm:py-5 rounded-none shadow-lg hover:brightness-110 active:scale-95 transition-all duration-200 cursor-pointer mt-2 self-start disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? t("Common.loading") : t("HomeScreen.Contact.step2.form.submit")}
                </button>
            </form>
        </div>
    );
}

export default Step2;
