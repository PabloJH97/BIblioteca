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
import { PackageOpen } from "lucide-react";
import { FileText } from "lucide-react";
import { Settings } from "lucide-react";
import { Mail } from "lucide-react";
import { Lock } from "lucide-react";
import { X } from "lucide-react";
import { Save } from "lucide-react";
import { Shield } from "lucide-react";
import { useState } from "react";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Option, Select } from "react-day-picker";
import { Checkbox } from "@/components/ui/checkbox";

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
            "users.view": "",
            "users.create": "",
            "users.edit": "",
            "users.delete": "",
            "products.view": "",
            "products.create": "",
            "products.edit": "",
            "products.delete": "",
            "reports.view": "",
            "reports.export": "",
            "reports.print": "",
            "connfig.access": "",
            "config.modify": "",
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

    const [state, setState]=useState(false);
    const [permissionArray, setPermissionArray]=useState(['']);


    function changeStateInfo(){
        setState(false);
    }
    function changeStateRoles(){
        setState(true);
    }


    function UserFormContent(){
        if(!state){
            return(
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
            )
        }else{

            return(
                <CardContent className="bg-white font-bold">
                        <div>
                            <form.Field
                                name="role"
                                >

                                {(field)=>(
                                    <>
                                        <div className="flex flex-row">
                                            <Shield className="w-5" color="#155dfc"></Shield>
                                            <p>{t("ui.users.role.main")}</p>
                                        </div>

                                        <Select className="w-full h-10 border-2 rounded-md">
                                            <Option>{"Selecciona un rol"}</Option>
                                            <Option>{t("ui.users.role.admin")}</Option>
                                            <Option>{t("ui.users.role.client")}</Option>
                                        </Select>
                                    </>
                                )}
                            </form.Field>
                            <p className="font-sans text-sm text-gray-400 font-bold">{"El rol determina el nivel de acceso general del usuario"}</p>
                        </div>
                        <br />
                        <div className="border-2"></div>
                        <br />

                        <div>
                            <div className="flex flex-row font-bold">
                                <Shield className="w-5" color="#155dfc"></Shield>
                                <h2>{t("ui.users.permissions.title")}</h2>
                            </div>
                            <br />
                            <div className="flex flex-wrap w-full font-bold">

                            <Card className="w-1/2 bg-gray-50">
                                <CardContent>
                                    <div className="flew flew-row">
                                    <User className="w-5" color="#155dfc"></User>
                                    <p className="w-1/2">{t("ui.users.permissions.users.title")}</p>
                                    </div>
                                    <form.Field
                                        name="users.view"
                                        >
                                        {(field)=>(
                                            <>
                                                <div className="items-center">
                                                    <Checkbox id={field.name} name={field.name} className="border-blue-600" value={field.state.value} onChange={()=>{setPermissionArray([...permissionArray, field.state.value])}}></Checkbox>
                                                    <Label>{t("ui.users.permissions.users.view")}</Label>
                                                </div>
                                            </>
                                        )}
                                    </form.Field>
                                    <form.Field
                                        name="users.create"
                                        >
                                        {(field)=>(
                                            <>
                                                <div className="items-center">
                                                    <Checkbox id={field.name} name={field.name} className="border-blue-600" value={field.state.value} onChange={()=>{setPermissionArray([...permissionArray, field.state.value])}}></Checkbox>
                                                    <Label>{t("ui.users.permissions.users.create")}</Label>
                                                </div>
                                            </>
                                        )}
                                    </form.Field>
                                    <form.Field
                                        name="users.edit"
                                        >
                                        {(field)=>(
                                            <>
                                                <div className="items-center">
                                                    <Checkbox id={field.name} name={field.name} className="border-blue-600" value={field.state.value} onChange={()=>{setPermissionArray([...permissionArray, field.state.value])}}></Checkbox>
                                                    <Label>{t("ui.users.permissions.users.edit")}</Label>
                                                </div>
                                            </>
                                        )}
                                    </form.Field>

                                    <form.Field
                                        name="users.delete"
                                        >
                                        {(field)=>(
                                            <>
                                                <div className="items-center">
                                                    <Checkbox id={field.name} name={field.name} className="border-blue-600" value={field.state.value} onChange={()=>{setPermissionArray([...permissionArray, field.state.value])}}></Checkbox>
                                                    <Label>{t("ui.users.permissions.users.delete")}</Label>
                                                </div>
                                            </>
                                        )}
                                    </form.Field>
                                    </CardContent>
                                </Card>
                                <Card className="w-1/2 bg-gray-50">
                                <CardContent>
                                    <div className="flew flew-row">
                                        <PackageOpen className="w-5" color="#155dfc"></PackageOpen>
                                        <p className="w-1/2">{t("ui.users.permissions.products.title")}</p>
                                    </div>
                                    <form.Field
                                        name="products.view"
                                        >
                                        {(field)=>(
                                            <>
                                                <div>
                                                    <Checkbox className="border-blue-600" value={"products.view"}></Checkbox>
                                                    <Label>{t("ui.users.permissions.products.view")}</Label>
                                                </div>
                                            </>
                                        )}
                                    </form.Field>
                                    <form.Field
                                        name="products.create"
                                        >
                                        {(field)=>(
                                            <>
                                                <div>
                                                    <Checkbox className="border-blue-600" value={"products.create"}></Checkbox>
                                                    <Label>{t("ui.users.permissions.products.create")}</Label>
                                                </div>
                                            </>
                                        )}
                                    </form.Field>
                                    <form.Field
                                        name="products.edit"
                                        >
                                        {(field)=>(
                                            <>
                                                <div>
                                                    <Checkbox className="border-blue-600" value={"products.edit"}></Checkbox>
                                                    <Label>{t("ui.users.permissions.products.edit")}</Label>
                                                </div>
                                            </>
                                        )}
                                    </form.Field>

                                    <form.Field
                                        name="products.delete"
                                        >
                                        {(field)=>(
                                            <>
                                                <div>
                                                    <Checkbox className="border-blue-600" value={"products.delete"}></Checkbox>
                                                    <Label>{t("ui.users.permissions.products.delete")}</Label>
                                                </div>
                                            </>
                                        )}
                                    </form.Field>


                                    </CardContent>
                                </Card>
                                <Card className="w-1/2 bg-gray-50">
                                <CardContent>
                                    <div className="flew flew-row">
                                        <FileText className="w-5" color="#155dfc"></FileText>
                                        <p className="w-1/2">{t("ui.users.permissions.reports.title")}</p>
                                    </div>
                                    <form.Field
                                        name="reports.view"
                                        >
                                        {(field)=>(
                                            <>
                                                <div>
                                                    <Checkbox className="border-blue-600" value={"reports.view"}></Checkbox>
                                                    <Label>{t("ui.users.permissions.reports.view")}</Label>
                                                </div>
                                            </>
                                        )}
                                    </form.Field>
                                    <form.Field
                                        name="reports.export"
                                        >
                                        {(field)=>(
                                            <>
                                                <div>
                                                    <Checkbox className="border-blue-600" value={"reports.export"}></Checkbox>
                                                    <Label>{t("ui.users.permissions.reports.export")}</Label>
                                                </div>
                                            </>
                                        )}
                                    </form.Field>
                                    <form.Field
                                        name="reports.print"
                                        >
                                        {(field)=>(
                                            <>
                                                <div>
                                                    <Checkbox className="border-blue-600" value={"reports.print"}></Checkbox>
                                                    <Label>{t("ui.users.permissions.reports.print")}</Label>
                                                </div>
                                            </>
                                        )}
                                    </form.Field>
                                    </CardContent>
                                </Card>
                                <Card className="w-1/2 bg-gray-50">
                                <CardContent>
                                    <div className="flew flew-row">
                                        <Settings className="w-5" color="#155dfc"></Settings>
                                        <p className="w-1/2">{t("ui.users.permissions.config.title")}</p>
                                    </div>
                                    <form.Field
                                        name="config.access"
                                        >
                                        {(field)=>(
                                            <>
                                                <div>
                                                    <Checkbox className="border-blue-600" value={"config.access"}></Checkbox>
                                                    <Label>{t("ui.users.permissions.config.access")}</Label>
                                                </div>
                                            </>
                                        )}
                                    </form.Field>
                                    <form.Field
                                        name="config.modify"
                                        >
                                        {(field)=>(
                                            <>
                                                <div>
                                                    <Checkbox className="border-blue-600" value={"config.modify"}></Checkbox>
                                                    <Label>{t("ui.users.permissions.config.modify")}</Label>
                                                </div>
                                            </>
                                        )}
                                    </form.Field>
                                    </CardContent>
                                </Card>

                            </div>

                        </div>
                    </CardContent>
            )
        }
    }

    function ButtonInfo(){
        if(!state){
            return(<Button type="button" className="w-full mx-1 my-1 bg-white text-black" onClick={changeStateInfo}>{"Información básica"}</Button>)
        }else{
            return(<Button type="button" className="w-full mx-1 my-1 bg-gray-100 text-gray-400 font-bold" onClick={changeStateInfo}>{"Información básica"}</Button>);
        }

    }

    function ButtonRoles(){
        if(state){
            return(<Button type="button" className="w-full mx-1 my-1 bg-white text-black font-bold" onClick={changeStateRoles}>{"Roles y permisos"}</Button>)
        }else{
            return(<Button type="button" className="w-full mx-1 my-1 bg-gray-100 text-gray-400 font-bold" onClick={changeStateRoles}>{"Roles y permisos"}</Button>);
        }
    }

    function UserFormView(){
        return(
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Name field */}
                <Card className="bg-gray-50">
                    <CardHeader>
                        <div className="flex flex-row">
                            <User color="#155dfc"></User>
                            <h1 className="font-bold">{"Crear nuevo usuario"}</h1>
                        </div>
                        <div>
                            <p className="font-sans text-sm text-gray-400 font-bold">{"Ingresa la información para crear un nuevo usuario en el sistema"}</p>
                        </div>
                    </CardHeader>
                    <CardTitle className="border-t-1 border-b-1 bg-white">
                        <div className="flex flex-row justify-center mx-5 mt-3 border-1 rounded-md bg-gray-100">
                            <ButtonInfo></ButtonInfo>
                            <ButtonRoles></ButtonRoles>
                        </div>
                    </CardTitle>

                    <UserFormContent></UserFormContent>
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
        )
    }




    return (
        <UserFormView></UserFormView>
    );
}
