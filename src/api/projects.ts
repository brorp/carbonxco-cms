import { CarbonxApi } from 'api';
import { Project } from 'pages/dashboard/projects/types';
import { Pagination } from 'types/Pagination';

const handleImage = (updatePayload: Project) => {
  console.log('updatePayload', updatePayload);
  const feature = {
    ...updatePayload?.featuredImage?.[0],
    document_type: 'project_thumbnail',
  };
  // @ts-expect-error: id does exist (?)
  const featureId = feature.id;
  // @ts-expect-error: id does exist (?)
  feature.id = featureId ?? '';

  const gallery = updatePayload?.gallery?.map((eachGallery) => ({
    ...eachGallery,
    document_type: 'project_gallery',

    // @ts-expect-error: id does exist (?)
    id: eachGallery.id ?? '',
  })) as [];

  const map = { ...updatePayload?.projectMap?.[0], document_type: 'project_map' };
  // @ts-expect-error: id does exist (?)
  const mapId = map.id;
  // @ts-expect-error: id does exist (?)
  map.id = mapId ?? '';

  // const documents: any = [feature, ...gallery, map];
  const documents = [];
  // @ts-expect-error: id does exist (?)
  if (feature.key) {
    documents.push(feature);
  }

  // @ts-expect-error: id does exist (?)
  if (map.key) {
    documents.push(map);
  }

  if (gallery?.length) {
    documents.push(...gallery);
  }
  console.log('documents', documents);

  delete updatePayload.featuredImage;
  delete updatePayload.gallery;
  delete updatePayload.projectMap;

  const sanitizeDocuments = documents.map((eachDoc: any) => {
    return {
      id: eachDoc.id,
      file_type: eachDoc.file_type,
      file_name: eachDoc.file_name,
      url: eachDoc.url,
      document_type: eachDoc.document_type,
      key: eachDoc.key,
      reference_type: 'projects',
    };
  });

  return sanitizeDocuments;
};

export const getProjects = (pagination: Pagination) => {
  const { limit, page } = pagination;
  return CarbonxApi.get(`/projects?page=${page}&limit=${limit}`);
};

export const getProjectDetail = (id: string) => {
  return CarbonxApi.get(`/projects/${id}`);
};

export const postProject = (payload: Project) => {
  const updatePayload = { ...payload };
  const documents = handleImage(updatePayload);

  return CarbonxApi.post('/projects', { ...updatePayload, documents });
};

export const updateProject = (id: string, payload: Project) => {
  const documents = handleImage(payload);
  return CarbonxApi.put(`/projects/${id}`, { ...payload, documents });
};

export const deleteProject = (id: string) => {
  return CarbonxApi.delete(`/projects/${id}`);
};
