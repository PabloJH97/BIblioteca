import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslations } from '@/hooks/use-translations';
import { router } from '@inertiajs/react';
import type { AnyFieldApi } from '@tanstack/react-form';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { FileText, Lock, Mail, PackageOpen, Save, Settings, Shield, SquareMenu, X, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Option, Select } from 'react-day-picker';
import { toast } from 'sonner';

interface ReservationFormProps {
    initialData?: {
        id: string;
        ISBN: string;
        email: string;
    };
    page?: string;
    perPage?: string;
    pageTitle?: string;
    bookISBN?: string | null;
}


// Field error display component
function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <p className="text-destructive mt-1 text-sm">{field.state.meta.errors.join(', ')}</p>
            ) : null}
            {field.state.meta.isValidating ? <p className="text-muted-foreground mt-1 text-sm">Validating...</p> : null}
        </>
    );
}

export function ReservationForm({ initialData, page, perPage, pageTitle, bookISBN }: ReservationFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();
    // TanStack Form setup
    const form = useForm({
        defaultValues: {
            ISBN: initialData?.ISBN ?? bookISBN ?? '',
            email: initialData?.email ?? '',
        },
        onSubmit: async ({ value }) => {
            const formData=new FormData();
            formData.append('ISBN', value.ISBN);
            formData.append('email', value.email);
            formData.append('returned_date', 'false');
            formData.append('_method', 'PUT');
            const options = {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['reservations'] });

                    // Construct URL with page parameters
                    let url = '/reservations';
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
                        toast.error(initialData ? t('messages.reservations.error.update') : t('messages.reservations.error.create'));
                    }
                },
            };

            // Submit with Inertia
            if (initialData) {
                router.post(`/reservations/${initialData.id}`, formData, options);
            } else {
                router.post('/reservations', value, options);
            }
        },
    });

    // Form submission handler
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
    };

    function ReservationFormData() {
        return (
            <CardContent className={'h-full bg-background'}>
                <div>
                    <form.Field
                        name="ISBN"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                return !value
                                    ? t('ui.validation.required', { attribute: t('ui.reservations.fields.book').toLowerCase() })
                                    : value.length < 2
                                      ? t('ui.validation.min.string', { attribute: t('ui.reservations.fields.book').toLowerCase(), min: '2' })
                                      : undefined;
                            },
                        }}
                    >
                        {(field) => (
                            <>
                                <div className="flex flex-row items-center">
                                    <SquareMenu className="w-5"></SquareMenu>
                                    <Label htmlFor={field.name}>{t('ui.reservations.fields.book')}</Label>
                                </div>

                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder={t('ui.reservations.placeholders.book')}
                                    disabled={form.state.isSubmitting || bookISBN!=null }
                                    required={false}
                                    autoComplete="off"
                                />
                                <FieldInfo field={field} />
                            </>
                        )}
                    </form.Field>
                </div>
                <br />
                <div>
                    <form.Field
                        name="email"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                return !value
                                    ? t('ui.validation.required', { attribute: t('ui.reservations.fields.user').toLowerCase() })
                                    : value.length < 2
                                      ? t('ui.validation.min.string', { attribute: t('ui.reservations.fields.user').toLowerCase(), min: '2' })
                                      : undefined;
                            },
                        }}
                    >
                        {(field) => (
                            <>
                                <div className="flex flex-row items-center">
                                    <SquareMenu className="w-5"></SquareMenu>
                                    <Label htmlFor={field.name}>{t('ui.reservations.fields.user')}</Label>
                                </div>

                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder={t('ui.reservations.placeholders.user')}
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
            </CardContent>
        );
    }



    function ReservationFormView() {
        return (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Name field */}
                <Card className="bg-background">
                    <CardHeader>
                        <div className="flex flex-row">
                            <SquareMenu color="#155dfc"></SquareMenu>
                            <h1 className="font-bold">{pageTitle}</h1>
                        </div>
                        <div>
                            <p className="font-sans text-sm font-bold text-gray-400">
                                {'Ingresa la información para crear un nuevo préstamo en el sistema'}
                            </p>
                        </div>
                    </CardHeader>

                    <div><ReservationFormData></ReservationFormData></div>

                    {/* Form buttons */}
                    <CardFooter className="justify-center">
                        <div className="flex w-full flex-row justify-between gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    let url = '/reservations';
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
                                {t('ui.reservations.buttons.cancel')}
                            </Button>

                            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                                {([canSubmit, isSubmitting]) => (
                                    <Button type="submit" disabled={!canSubmit} className="bg-blue-400">
                                        <Save></Save>
                                        {isSubmitting
                                            ? t('ui.reservations.buttons.saving')
                                            : initialData
                                              ? t('ui.reservations.buttons.update')
                                              : t('ui.reservations.buttons.save')}
                                    </Button>
                                )}
                            </form.Subscribe>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        );
    }

    return <ReservationFormView></ReservationFormView>;
}
