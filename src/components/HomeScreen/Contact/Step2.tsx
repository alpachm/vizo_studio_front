// ---------------------------------------------------------------------------
// Step 2 — Multi-select interest options + project details form
// ---------------------------------------------------------------------------
import { useState } from "react";
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

function Step2({ onBack, onSubmitForm }: IContactStep2Props) {
    const { t } = useTranslation();
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [selectedBudget, setSelectedBudget] = useState<string>("");

    const {
        register,
        handleSubmit,
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

    const toggleOption = (id: string) => {
        setSelectedInterests((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
        );
    };

    const onSubmit = handleSubmit((formValues) => {
        const payload: ContactFormData = {
            ...formValues,
            selectedInterests,
            budget: selectedBudget,
        };
        onSubmitForm?.(payload);
    });

    const inputBaseClasses =
        "bg-transparent border-b border-text/30 focus:border-[var(--color-primary)] focus:outline-none rounded-none py-3 px-1 transition-colors w-full text-text placeholder:text-text/40 font-body text-base";

    const errorTextClasses = "text-red-400 text-sm mt-1 font-body";

    return (
        <div className="w-full min-h-dvh flex flex-col bg-bg px-4 py-12 sm:px-8 md:px-16 lg:px-24">
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

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl font-thin text-text mb-4">
                {t("HomeScreen.Contact.step2.subtitle")}
            </p>

            {/* Multi-Select Interest Buttons */}
            <div className="flex flex-wrap gap-4 mt-4 mb-10">
                {INTEREST_OPTIONS.map((option) => {
                    const isActive = selectedInterests.includes(option.id);

                    return (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => toggleOption(option.id)}
                            className={`font-body text-base sm:text-lg font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-none transition-all duration-200 cursor-pointer ${
                                isActive
                                    ? "bg-primary text-white border-primary"
                                    : "bg-transparent border border-text/20 text-text hover:border-text/50"
                            }`}
                        >
                            {t(option.translationKey)}
                        </button>
                    );
                })}
            </div>

            {/* Budget Range — Single Selection */}
            <h3 className="font-title text-xl sm:text-2xl font-bold text-text mb-6">
                {t("HomeScreen.Contact.step2.budget.subtitle")}
            </h3>

            <div className="flex flex-wrap gap-3 sm:gap-4 w-full mb-10">
                {BUDGET_OPTIONS.map((option) => {
                    const isActive = selectedBudget === option.id;

                    return (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => setSelectedBudget(isActive ? "" : option.id)}
                            className={`font-body text-base sm:text-lg font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-none transition-all duration-200 cursor-pointer ${
                                isActive
                                    ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-lg scale-[1.02]"
                                    : "bg-transparent border border-text/20 text-text hover:border-[var(--color-primary)]"
                            }`}
                        >
                            {t(option.label)}
                        </button>
                    );
                })}
            </div>

            {/* Project Details Form */}
            <form onSubmit={onSubmit} className="w-full max-w-2xl flex flex-col gap-6">
                {/* Full Name */}
                <div className="flex flex-col">
                    <input
                        {...register("fullName", {
                            required: t("HomeScreen.Contact.step2.form.errors.fullName"),
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
                            required: t("HomeScreen.Contact.step2.form.errors.email"),
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: t("HomeScreen.Contact.step2.form.errors.email"),
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

                {/* Phone */}
                <div className="flex flex-col">
                    <input
                        {...register("phone", {
                            required: t("HomeScreen.Contact.step2.form.errors.phone"),
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

                {/* Project Details (Textarea) */}
                <div className="flex flex-col">
                    <textarea
                        {...register("projectDetails", {
                            required: t("HomeScreen.Contact.step2.form.errors.projectDetails"),
                        })}
                        rows={5}
                        placeholder={t("HomeScreen.Contact.step2.form.projectDetails")}
                        className={`${inputBaseClasses} resize-none ${
                            errors.projectDetails ? "border-red-400 focus:border-red-400" : ""
                        }`}
                    />
                    {errors.projectDetails && (
                        <span className={errorTextClasses}>{errors.projectDetails.message}</span>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary text-white font-body text-lg sm:text-xl font-bold px-10 py-4 sm:px-12 sm:py-5 rounded-none shadow-lg hover:brightness-110 active:scale-95 transition-all duration-200 cursor-pointer mt-4 self-start disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {t("HomeScreen.Contact.step2.form.submit")}
                </button>
            </form>
        </div>
    );
}

export default Step2;
