

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './css/swiper-custom.css'; // Importa el archivo con los estilos personalizados
import { RenderBiography } from './reponses/RenderBiography';
import { RenderList } from './reponses/RenderList';
import { RenderComparison } from './reponses/RenderComparison';
import { RenderMultimedia } from './reponses/RenderMultimedia';
import { RenderModel } from './reponses/RenderModel';
import { RenderSummary } from './reponses/RenderSummary';

interface Multimedia {
    images: { link: '', description: '' }[]; // Array de URLs de imágenes
    videos: { link: '', description: '' }[]; // Array de URLs de videos
    audios: { link: '', description: '' }[];
    documents: { link: '', description: '' }[] // Array de URLs de audios
}

interface Biography {
    title: string;
    text: string;
    multimedia: Multimedia;
}

interface ComparisonItem {
    title: string;
    multimedia: Multimedia;
}

interface Comparison {
    title: string;
    text: string;
    items: ComparisonItem[];
}

interface ListItem {
    title: string;
    text: string;
    multimedia: Multimedia;
}

interface List {
    title: string;
    items: ListItem[];
}

interface Similarity {
    title: string;
    items: ListItem[];
}


interface Model {
    text: string
}

interface Summary {
    title: string;
    text: string;
}

interface MultimediaQA {
    title: string;
    multimedia: Multimedia;
}
// Definición del tipo ChatResponse
interface ChatResponse {
    data: {
        type: 'biography' | 'comparison' | 'list' | 'similarity' | 'multimedia' | 'model' | 'summary'; // Los tipos que puede recibir
        query: string;
        result: Biography | Comparison | List | Similarity | MultimediaQA | Model | Summary; // Definición más específica de result
    }
}

// Componente principal
const ChatResponseDisplay: React.FC<ChatResponse> = ({ data }) => {

    const { type, result } = data;
    return (
        <div>
            {type === 'biography' && RenderBiography(result as Biography)}
            {(type === 'list' || type === 'similarity') && RenderList(result as List)}
            {type === 'comparison' && RenderComparison(result as Comparison)}
            {type === 'multimedia' && RenderMultimedia(result as MultimediaQA)}
            {type === 'model' && RenderModel(result as Model)}
            {type === 'summary' && RenderSummary(result as Summary)}
            {/* Puedes agregar más tipos si es necesario */}
        </div>
    );
};

export default ChatResponseDisplay;
