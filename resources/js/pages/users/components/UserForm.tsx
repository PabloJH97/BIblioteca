import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { useTranslations } from "@/hooks/use-translations";
import { useForm } from "@tanstack/react-form";
import { User } from "lucide-react";
import { Mail } from "lucide-react";
import { Lock } from "lucide-react";
import { X } from "lucide-react";
import { Save } from "lucide-react";
import { Shield } from "lucide-react";
import { useState } from "react";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Option, Select } from "react-day-picker";

interface UserFormProps {
    initialData?: {
        id: string;
        name: string;
        email: string;
    };
    page?: string;
    perPage?: string;
}

// Field error display component
function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <p className="mt-1 text-sm text-destructive">
                    {field.state.meta.errors.join(", ")}
                </p>
            ) : null}
            {field.state.meta.isValidating ? (
                <p className="mt-1 text-sm text-muted-foreground">Validating...</p>
            ) : null}
        </>
    );
}




export function UserForm({ initialData, page, perPage }: UserFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();

    // TanStack Form setup
    const form = useForm({
        defaultValues: {
            name: initialData?.name ?? "",
            email: initialData?.email ?? "",
            password: "",
            role: "",
            permissions: "",
        },
        onSubmit: async ({ value }) => {
            const options = {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["users"] });

                    // Construct URL with page parameters
                    let url = "/users";
                    if (page) {
                        url += `?page=${page}`;
                        if (perPage) {
                            url += `&per_page=${perPage}`;
                        }
                    }

                    router.visit(url);
                },
                onError: (errors: Record<string, string>) => {
                    if (Object.keys(errors).length === 0) {
                        toast.error(
                            initialData
                                ? t("messages.users.error.update")
                                : t("messages.users.error.create")
                        );
                    }
                },
            };

            // Submit with Inertia
            if (initialData) {
                router.put(`/users/${initialData.id}`, value, options);
            } else {
                router.post("/users", value, options);
            }
        },
    });

    // Form submission handler
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
    };

    let state=false
    let content;




    return (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Name field */}
            <Card className="bg-gray-50">
                <CardHeader>
                    <div className="flex flex-row">
                        <User color="cyan"></User>
                        <h1 className="font-bold">{"Crear nuevo usuario"}</h1>
                    </div>
                    <div>
                        <p className="font-sans text-sm text-gray-400 font-bold">{"Ingresa la información para crear un nuevo usuario en el sistema"}</p>
                    </div>
                </CardHeader>
                <CardTitle className="border-t-1 border-b-1 bg-white">
                    <div className="flex flex-row justify-center mx-5 mt-3 border-1 rounded-md bg-gray-100">
                        <Button className="w-full mx-1 my-1 bg-gray-100 text-gray-400 font-bold" >{"Información básica"}</Button>
                        <Button className="w-full mx-1 my-1 bg-gray-100 text-gray-400 font-bold">{"Roles y permisos"}</Button>
                    </div>
                </CardTitle>
                <CardContent className="bg-white h-full">
                    <div>
                        <form.Field
                            name="name"
                            validators={{
                                onChangeAsync: async ({ value }) => {
                                    await new Promise((resolve) => setTimeout(resolve, 500));
                                    return !value
                                        ? t("ui.validation.required", { attribute: t("ui.users.fields.name").toLowerCase() })
                                        : value.length < 2
                                            ? t("ui.validation.min.string", { attribute: t("ui.users.fields.name").toLowerCase(), min: "2" })
                                            : undefined;
                                },
                            }}
                        >
                            {(field) => (
                                <>
                                    <div className="flex flex-row items-center">
                                        <User className="w-5"></User>
                                        <Label htmlFor={field.name}>{t("ui.users.fields.name")}</Label>
                                    </div>

                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                        placeholder={t("ui.users.placeholders.name")}
                                        disabled={form.state.isSubmitting}
                                        required={false}
                                        autoComplete="off"
                                    />
                                    <FieldInfo field={field} />
                                </>
                            )}
                        </form.Field>
                    </div>
                    <br />
                    {/* Email field */}
                    <div>
                        <form.Field
                            name="email"
                            validators={{
                                onChangeAsync: async ({ value }) => {
                                    await new Promise((resolve) => setTimeout(resolve, 500));
                                    return !value
                                        ? t("ui.validation.required", { attribute: t("ui.users.fields.email").toLowerCase() })
                                        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                                            ? t("ui.validation.email", { attribute: t("ui.users.fields.email").toLowerCase() })
                                            : undefined;
                                },
                            }}
                        >
                            {(field) => (
                                <>
                                    <div className="flex flex-row items-center">
                                        <Mail className="w-5"></Mail>
                                        <Label htmlFor={field.name}>{t("ui.users.fields.email")}</Label>
                                    </div>

                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="text"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                        placeholder={t("ui.users.placeholders.email")}
                                        disabled={form.state.isSubmitting}
                                        required={false}
                                        autoComplete="off"
                                    />
                                    <FieldInfo field={field} />
                                </>
                            )}
                        </form.Field>
                    </div>
                    <br />
                    {/* Password field */}
                    <div>
                        <form.Field
                            name="password"
                            validators={{
                                onChangeAsync: async ({ value }) => {
                                    await new Promise((resolve) => setTimeout(resolve, 500));
                                    if (!initialData && (!value || value.length === 0)) {
                                        return t("ui.validation.required", { attribute: t("ui.users.fields.password").toLowerCase() });
                                    }
                                    if (value && value.length > 0 && value.length < 8) {
                                        return t("ui.validation.min.string", { attribute: t("ui.users.fields.password").toLowerCase(), min: "8" });
                                    }
                                    return undefined;
                                },
                            }}
                        >
                            {(field) => (
                                <>
                                    <div className="flex flex-row items-center">
                                        <Lock className="w-5"></Lock>
                                        <Label htmlFor={field.name}>
                                            {initialData
                                                ? t("ui.users.fields.password_optional")
                                                : t("ui.users.fields.password")}
                                        </Label>
                                    </div>

                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="password"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                        placeholder={t("ui.users.placeholders.password")}
                                        disabled={form.state.isSubmitting}
                                        autoComplete="off"
                                        required={false}
                                    />
                                    <FieldInfo field={field} />
                                </>
                            )}
                        </form.Field>
                    </div>
                </CardContent>
                <CardContent>
                    <div>
                        <form.Field
                            name="role"
                            >

                            {(field)=>(
                                <>
                                    <div className="flex flex-row">
                                        <Shield className="w-5"></Shield>
                                        <Label htmlFor={field.name}>
                                            {initialData
                                                ? t("ui.users.role.main")
                                                : t("ui.users.role.main")}
                                        </Label>
                                    </div>

                                    <Select>
                                        <Option>{t("ui.users.role.admin")}</Option>
                                        <Option>{t("ui.users.role.client")}</Option>
                                    </Select>
                                </>
                            )}
                        </form.Field>
                    </div>
                    <div>

                    </div>
                </CardContent>
                    {/* Form buttons */}
                    <CardFooter className="justify-center">
                        <div className="flex flex-row gap-4 justify-between w-full">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    let url = "/users";
                                    if (page) {
                                        url += `?page=${page}`;
                                        if (perPage) {
                                            url += `&per_page=${perPage}`;
                                        }
                                    }
                                    router.visit(url);
                                }}
                                disabled={form.state.isSubmitting}
                            >
                                <X></X>
                                {t("ui.users.buttons.cancel")}
                            </Button>

                            <form.Subscribe
                                selector={(state) => [state.canSubmit, state.isSubmitting]}
                            >
                                {([canSubmit, isSubmitting]) => (
                                    <Button type="submit" disabled={!canSubmit} className="bg-blue-400">
                                        <Save></Save>
                                        {isSubmitting
                                            ? t("ui.users.buttons.saving")
                                            : initialData
                                                ? t("ui.users.buttons.update")
                                                : t("ui.users.buttons.save")}

                                    </Button>
                                )}
                            </form.Subscribe>
                        </div>
                    </CardFooter>

            </Card>
        </form>
    );
}
