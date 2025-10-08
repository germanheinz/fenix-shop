import { getProductBySlug } from "@/actions";
import { Title } from "@/components/ui/title/Title";
import { redirect } from "next/navigation";
import { ProductForm } from './ui/ProductForm';
import getCategories from "@/actions/categories/getCategories";

interface Props {
    params: {
        slug: string
    }
}

export default async function ProductPage( {params }: Props) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

    const [ product, categories ] = await Promise.all([
        getProductBySlug(slug),
        getCategories()
    ])

    //todo new
    if(!product && slug !== 'new'){ redirect('/admin/products')}
    
    const title = (slug ==='new') ? 'New Product' : 'Edit Product';

    return(
        <>
            <Title title={ title }/>

            <ProductForm product={ product ?? {} } categories={ categories }/>
        </>
    ) 
}
