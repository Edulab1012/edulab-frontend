// import { Student, useExistingUserSotre } from "@/hooks/useExistingUserSotre";

// export const getInitialStudentProfile = (user = useExistingUserSotre.getState().user): Student => {
//     const student = user?.student;

//     return {
//         id: student?.id ?? "",
//         firstName: student?.firstName ?? "",
//         lastName: student?.lastName ?? "",
//         email: student?.email ?? "",
//         avatarUrl: student?.avatarUrl ?? "",
//         backgroundUrl: student?.backgroundUrl ?? "",
//         bio: student?.bio ?? "",
//         socials: {
//             instagram: student?.socials?.instagram ?? "",
//             facebook: student?.socials?.facebook ?? "",
//         },
//         grade: student?.grade ?? "",
//         class: student?.class ?? "",
//         phoneNumber: student?.phoneNumber ?? "",
//         teacher: student?.teacher ?? "",
//     };
// };