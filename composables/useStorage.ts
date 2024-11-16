export const useStorage = () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  const uploadThumbnail = async (file: File) => {
    if (!user.value?.id) throw new Error('User not authenticated')

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `thumbnails/${fileName}`

    const { error: uploadError, data } = await client
      .storage
      .from('project-thumbnails')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = client
      .storage
      .from('project-thumbnails')
      .getPublicUrl(filePath)

    return publicUrl
  }

  return {
    uploadThumbnail
  }
}