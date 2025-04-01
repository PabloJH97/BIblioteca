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

interface ZoneFormProps {
    initialData?: {
        id: string;
        genre_id:string;
        floor_id:string;

    };
    page?: string;
    perPage?: string;
    pageTitle?: string;
    genreArray: any[];
    floorArray: any[];
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

export function ZoneForm({ initialData, page, perPage, pageTitle, genreArray, floorArray }: ZoneFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();
    const [genreState, setGenreState]=useState(initialData?.genre_id ?? '')
    const [floorState, setFloorState]=useState(initialData?.floor_id ?? '');


    function changeGenreId(value: string){
        setGenreState(value)
        form.setFieldValue('genre_id', value)
    }

    function changeFloorId(value: string){
        setFloorState(value)
        form.setFieldValue('floor_id', value)
    }

    // TanStack Form setup
    const form = useForm({
        defaultValues: {
            genre_id: initialData?.genre_id ?? '',
            floor_id: initialData?.floor_id ?? '',

        },
        onSubmit: async ({ value }) => {
            const options = {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['zones'] });

                    // Construct URL with page parameters
                    let url = '/zones';
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
                        toast.error(initialData ? t('messages.zones.error.update') : t('messages.zones.error.create'));
                    }
                },
            };

            // Submit with Inertia
            if (initialData) {
                router.put(`/zones/${initialData.id}`, value, options);
            } else {
                router.post('/zones', value, options);
            }
        },
    });

    // Form submission handler
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
    };



    function ZoneFormData() {
        const genreList = genreArray.map(genre=>
            <Option value={genre.id}>{genre.name}</Option>
        )
        const floorList = floorArray.map(floor=>
            <Option value={floor.id}>{floor.name}</Option>
        )
        return (
            <CardContent className={'h-full bg-background'}>
                <div>
                    <form.Field
                        name="genre_id"

                    >
                        {(field) => (
                            <>
                                <div className="flex flex-row items-center">
                                    <Circle className="w-5"></Circle>
                                    <Label htmlFor={field.name}>{t('ui.zones.fields.name')}</Label>
                                </div>

                                <Select defaultValue={genreState} onChange={(e)=> {field.handleChange(e.target.value), changeGenreId(e.target.value)}} className='h-10 w-full rounded-md border-2'>
                                    <Option value={''}>{'Seleccione un género'}</Option>
                                    {genreList}
                                </Select>
                                <FieldInfo field={field} />
                            </>
                        )}
                    </form.Field>
                </div>
                <div>
                    <form.Field
                        name="floor_id"

                    >
                        {(field) => (
                            <>
                                <div className="flex flex-row items-center">
                                    <Circle className="w-5"></Circle>
                                    <Label htmlFor={field.name}>{t('ui.zones.fields.name')}</Label>
                                </div>

                                <Select defaultValue={floorState} onChange={(e)=> {field.handleChange(e.target.value), changeFloorId(e.target.value)}} className='h-10 w-full rounded-md border-2'>
                                    <Option value={''}>{'Seleccione un piso'}</Option>
                                    {floorList}
                                </Select>
                                <FieldInfo field={field} />
                            </>
                        )}
                    </form.Field>
                </div>
                <br />
            </CardContent>
        );
    }



    function ZoneFormView() {

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
                                {'Ingresa la información para crear una nueva zona en el sistema'}
                            </p>
                        </div>
                    </CardHeader>

                    <div><ZoneFormData></ZoneFormData></div>

                    {/* Form buttons */}
                    <CardFooter className="justify-center">
                        <div className="flex w-full flex-row justify-between gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    let url = '/zones';
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
                                {t('ui.zones.buttons.cancel')}
                            </Button>

                            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                                {([canSubmit, isSubmitting]) => (
                                    <Button type="submit" disabled={!canSubmit} className="bg-blue-400">
                                        <Save></Save>
                                        {isSubmitting
                                            ? t('ui.zones.buttons.saving')
                                            : initialData
                                              ? t('ui.zones.buttons.update')
                                              : t('ui.zones.buttons.save')}
                                    </Button>
                                )}
                            </form.Subscribe>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        );
    }

    return <ZoneFormView></ZoneFormView>;
}
