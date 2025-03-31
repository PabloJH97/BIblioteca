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
import { FileText, Lock, Mail, PackageOpen, Save, Settings, Shield, Circle, X, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Option, Select } from 'react-day-picker';
import { toast } from 'sonner';

interface BookshelfFormProps {
    initialData?: {
        id: string;
        number: number;
    };
    page?: string;
    perPage?: string;
    pageTitle?: string;
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

export function BookshelfForm({ initialData, page, perPage, pageTitle }: BookshelfFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();

    // TanStack Form setup
    const form = useForm({
        defaultValues: {
            number: initialData?.number,
        },
        onSubmit: async ({ value }) => {
            const options = {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['bookshelves'] });

                    // Construct URL with page parameters
                    let url = '/bookshelves';
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
                        toast.error(initialData ? t('messages.bookshelves.error.update') : t('messages.bookshelves.error.create'));
                    }
                },
            };

            // Submit with Inertia
            if (initialData) {
                router.put(`/bookshelves/${initialData.id}`, value, options);
            } else {
                router.post('/bookshelves', value, options);
            }
        },
    });

    // Form submission handler
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
    };

    function BookshelfFormData() {
        return (
            <CardContent className={'h-full bg-background'}>
                <div>
                    <form.Field
                        name="number"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                return !value
                                    ? t('ui.validation.required', { attribute: t('ui.bookshelves.fields.name').toLowerCase() })
                                    : value < 2
                                      ? t('ui.validation.min.string', { attribute: t('ui.bookshelves.fields.name').toLowerCase(), min: '2' })
                                      : undefined;
                            },
                        }}
                    >
                        {(field) => (
                            <>
                                <div className="flex flex-row items-center">
                                    <Circle className="w-5"></Circle>
                                    <Label htmlFor={field.name}>{t('ui.bookshelves.fields.name')}</Label>
                                </div>

                                <Input
                                    id={field.name}
                                    type='number'
                                    name={field.name}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(parseInt(e.target.value))}
                                    onBlur={field.handleBlur}
                                    placeholder={t('ui.bookshelves.placeholders.name')}
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



    function BookshelfFormView() {
        return (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Name field */}
                <Card className="bg-background">
                    <CardHeader>
                        <div className="flex flex-row">
                            <Circle color="#155dfc"></Circle>
                            <h1 className="font-bold">{pageTitle}</h1>
                        </div>
                        <div>
                            <p className="font-sans text-sm font-bold text-gray-400">
                                {'Ingresa la información para crear una nueva estantería en el sistema'}
                            </p>
                        </div>
                    </CardHeader>

                    <div><BookshelfFormData></BookshelfFormData></div>

                    {/* Form buttons */}
                    <CardFooter className="justify-center">
                        <div className="flex w-full flex-row justify-between gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    let url = '/bookshelves';
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
                                {t('ui.bookshelves.buttons.cancel')}
                            </Button>

                            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                                {([canSubmit, isSubmitting]) => (
                                    <Button type="submit" disabled={!canSubmit} className="bg-blue-400">
                                        <Save></Save>
                                        {isSubmitting
                                            ? t('ui.bookshelves.buttons.saving')
                                            : initialData
                                              ? t('ui.bookshelves.buttons.update')
                                              : t('ui.bookshelves.buttons.save')}
                                    </Button>
                                )}
                            </form.Subscribe>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        );
    }

    return <BookshelfFormView></BookshelfFormView>;
}
